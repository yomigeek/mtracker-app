import { Client } from 'pg';
import database from '../models/database';

class CheckExistingUser {
  static checkExistingUser(req, res, next) {
    const connectString = database;
    const clientString = new Client(connectString);
    clientString.connect();

    const results = [];
    const checkExistingUser = clientString.query(`SELECT * FROM users WHERE email= '${req.body.email}'`);
    checkExistingUser.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    checkExistingUser.on('end', () => {
      if (results.length > 0) {
        return res.status(400).json({

          status: 'fail',
          message: 'User Already Exist!',
        });
      } next();
    });
  }
}


export default CheckExistingUser;

