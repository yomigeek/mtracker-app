import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const env = process.env.NODE_ENV || 'development';

const mydatabase = process.env.DATABASE_URL;

const database = new Pool({ connectionString: mydatabase, ssl: true });


export default database;
