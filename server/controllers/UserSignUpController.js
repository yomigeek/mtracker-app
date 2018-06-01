import bcrypt from 'bcryptjs';
import database from '../models/database';

class UserSignUpController {
  static userSignUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 10);

    database.query(`${'insert into users (username,email,password,department,role) ' +
    "values ('"}${req.body.username.trim()}','${req.body.email.trim()}','${hashedPassword.trim()}','${req.body.department.trim()}','user')`, (err, response) => {
      if (err) {
        throw err;
      }
      return res.status(201).json({

        status: 'success',
        message: 'User Created Successfully!',
        data: {
          username: req.body.username,
          email: req.body.email,
          department: req.body.department,
        },
      });
    });
  }
}

export default UserSignUpController;

