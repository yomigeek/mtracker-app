import bcrypt from 'bcryptjs';
import Token from '../token';
import database from '../models/database';

class UserLoginController {
  // Method to login the users with the required credentials
  static userLogin(req, res) {
    const dbQuery = `SELECT id, role, password, fullname FROM users WHERE email= '${req.body.email}'`;
    database.query(dbQuery, (err, response) => {
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'Invalid Email!',
        });
      }
      const comparedpassword = bcrypt.compareSync(req.body.password.trim(), response.rows[0].password);
      if (comparedpassword) {
        const mytoken = Token.authToken(response.rows[0]);
        return res.status(200).json({
          status: 'success',
          message: 'Login successful',
          data: {
            mytoken,
            username: response.rows[0].fullname,
          },
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong password!',
      });
    });
  }
}

export default UserLoginController;

