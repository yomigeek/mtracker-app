import { Client } from 'pg';

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

export { connect, database };
