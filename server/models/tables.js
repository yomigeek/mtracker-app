import { Client } from 'pg';
import bcrypt from 'bcryptjs';

const env = process.env.NODE_ENV || 'development';

require('dotenv').config();

let database;

if (env == 'test') {
  database = process.env.DATABASE_TEST_URL;
} else {
  database = process.env.DATABASE_URL;
}

const connectString = database;
const clientString = new Client(connectString);

clientString.connect();

const hashedAdminPassword = bcrypt.hashSync('123456', 10);

const createTable = () => {
  const query = `
   

          DROP TABLE IF EXISTS users CASCADE;

          DROP TABLE IF EXISTS request_status CASCADE;

          DROP TABLE IF EXISTS requests CASCADE;

          DROP TYPE user_role;

          DROP TYPE priority_type;

          CREATE TYPE user_role as ENUM ('admin','user');
   
          CREATE TABLE IF NOT EXISTS users (
   
              id SERIAL PRIMARY KEY,
   
              fullname VARCHAR (100) NOT NULL,
   
              email VARCHAR (255) UNIQUE NOT NULL,

              department VARCHAR (100) NOT NULL,
   
              password VARCHAR (150) NOT NULL,
   
              role user_role DEFAULT 'user' ,
              
              createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   
          ); 

          CREATE TABLE IF NOT EXISTS request_status (
            
            id serial PRIMARY KEY,
            
            values VARCHAR(255) NOT NULL,
            
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

           );

          CREATE TYPE priority_type as ENUM ('low', 'medium', 'high');

          CREATE TABLE IF NOT EXISTS requests (
            
            id serial PRIMARY KEY,
            
            userId int REFERENCES users(id),
                        
            title VARCHAR(255) NOT NULL,
            
            description VARCHAR(255) NOT NULL,

            priority priority_type NOT NULL,

            status int REFERENCES request_status(id) ,
            
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
           );


          INSERT INTO users (

            fullname,

            email,

            department,

            password,
      
            role
   
          )
   
          VALUES (
   
            'Admin',
   
            'admin@gmail.com',
   
            'Repairs',
      
            '${hashedAdminPassword}',
   
            'admin'
   
          ); 
          
          INSERT INTO request_status VALUES
            (1, 'open'),
            (2, 'pending'),
            (3, 'declined'),
            (4, 'resolved');

      `;

  clientString.query(query, (err) => {
    if (err) {
      console.log(err.message);
    }
    clientString.end();
  });
};


createTable();


export default database;