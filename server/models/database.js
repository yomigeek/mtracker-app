import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import token from '../token';

const env = process.env.NODE_ENV || 'development';

require('dotenv').config();

let mydatabase;

if (env == 'test') {
  mydatabase = process.env.DATABASE_TEST_URL;
} else {
  mydatabase = process.env.DATABASE_URL;
}

const connectString = mydatabase;
const clientString = new Client(connectString);

clientString.connect();

class Databases {
  static addUsers(query) {
    // Check if user exist
    const dbQuery = clientString.query(query);
    return dbQuery;
  }
}
export default Databases;
