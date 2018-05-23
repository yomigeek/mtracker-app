import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const env = process.env.NODE_ENV || 'development';


let mydatabase;
console.log('environs', env);
if (env == 'test') {
  mydatabase = process.env.DATABASE_URL;
} else {
  mydatabase = process.env.DATABASE_URL;
}

const connectString = mydatabase;
const database = new Pool({ connectionString: mydatabase, ssl: true });


export default database;
