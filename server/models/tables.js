import { Client } from 'pg';
import bcrypt from 'bcryptjs';

const env = process.env.NODE_ENV || 'development';

require('dotenv').config();


const database = process.env.DATABASE_URL;

const connectString = database;
const clientString = new Client(connectString);

clientString.connect();

const hashedAdminPassword = bcrypt.hashSync('123456', 10);

const createTable = () => {
  const query = `
   

          DROP TABLE IF EXISTS users CASCADE;

          DROP TABLE IF EXISTS request_status CASCADE;

          DROP TABLE IF EXISTS requests CASCADE;

          DROP TYPE IF EXISTS user_role CASCADE;

          DROP TYPE IF EXISTS priority_type CASCADE;

          CREATE TYPE user_role as ENUM ('admin','user');
   
          CREATE TABLE IF NOT EXISTS users (
   
              id SERIAL PRIMARY KEY,
   
              username VARCHAR (100) NOT NULL,
   
              email VARCHAR (255) UNIQUE NOT NULL,

              department VARCHAR (100) NOT NULL,
   
              password VARCHAR (255) NOT NULL,
   
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

            username,

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

          INSERT INTO users (

            username,

            email,

            department,

            password,
      
            role
   
          )
   
          VALUES (
   
            'user test',
   
            'user@gmail.com',
   
            'IT',
      
            '${hashedAdminPassword}',
   
            'user'
   
          ); 
          
          INSERT INTO request_status VALUES
            (1, 'pending'),
            (2, 'approve'),
            (3, 'decline'),
            (4, 'resolve');

      `;

  clientString.query(query, (err) => {
    if (err) {
      return err.message;
    }
    clientString.end();
  });
};


createTable();
