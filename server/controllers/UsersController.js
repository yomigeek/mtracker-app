import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connect from '../models/database';

class Users {
  static userSignUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Check if user exist
    const query = connect.query(`${'insert into users (fullname,email,password,department,role) ' +
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
}

export default Users;
