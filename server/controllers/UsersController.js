import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import token from '../token';
import connect from '../models/database';

class Users {

  static userSignUp(req, res) {
    const connectString = database;
    const clientString = new Client(connectString);
    clientString.connect();

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Check if user exist
    const query = clientString.query(`${'insert into users (fullname,email,password,department,role) ' +
                                "values ('"}${req.body.fullname}','${req.body.email}','${hashedPassword}','${req.body.department}','user')`);
    query.on('end', () => res.status(201).json({

      status: 'success',
      message: 'User created successfully!',
      data: {
        fullname: req.body.fullname,
        email: req.body.email,
        department: req.body.department,
      },
    }));
  }
  
  static userLogin(req, res) {
    // Check if user exist
    const results = [];
    const checkExistingUser = connect.query(`SELECT * FROM users WHERE email= '${req.body.email}'`);
    checkExistingUser.on('row', (row) => {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    checkExistingUser.on('end', () => {
      if (results.length <= 0) {
        return res.status(400).json({

          status: 'fail',
          message: 'Invalid Email!',
        });
      }


      const comparedpassword = bcrypt.compareSync(req.body.password, results[0].password);
      if (comparedpassword) {
        const mytoken = token(results[0].id, results[0].role);
        return res.status(200).send({
          status: 'success',
          message: 'Login successful',
          data: {
            mytoken,
          },
        });
      }
      return res.status(400).send({
        status: 'fail',
        message: 'Wrong password!',
      });
    });
  }
}

export default Users;

