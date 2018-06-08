import bcrypt from 'bcryptjs';
import Token from '../token';
import database from '../models/database';

class UserLoginController {
  // Method to login the users with the required credentials
  static userLogin(req, res) {
    const dbQuery = `SELECT id, role, username, password FROM users WHERE email= '${req.body.email.trim()}'`;
    database.query(dbQuery, (err, response) => {
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'Invalid Email!',
        });
      }
      const comparedpassword = bcrypt
        .compareSync(req.body.password.trim(), response.rows[0].password);
      if (comparedpassword) {
        const tokenInfo = {
          id: response.rows[0].id,
          role: response.rows[0].role,
          username: response.rows[0].username,
        };
        const mytoken = Token.authToken(tokenInfo);
        return res.status(200).json({
          status: 'success',
          message: 'Login successful',
          data: {
            mytoken,
            username: response.rows[0].username,
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

