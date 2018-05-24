import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import database from '../models/database';

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
}

export default Users;

