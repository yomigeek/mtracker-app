import bcrypt from 'bcryptjs';
import Token from '../token';
import database from '../models/database';

class UserLoginController {
  static userLogin(req, res) {
    /**
   * @description Method to login a user
   *
   * @param {Object} UserLoginController
   *
   * @return {JSON Object} Returns JSON obejects of responses
   */
    const results = [];
    database.query(`SELECT id, role, password FROM users WHERE email= '${req.body.email}'`, (err, response) => {
      if (response.rows.length <= 0) {
        return res.status(400).json({

          status: 'fail',
          message: 'Invalid Email!',
        });
      }
      results.push(response);
      const comparedpassword = bcrypt.compareSync(req.body.password.trim(), response.rows[0].password);
      if (comparedpassword) {
        const mytoken = Token.authToken(response.rows[0]);
        return res.status(200).json({
          status: 'success',
          message: 'Login successful',
          data: {
            mytoken,
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

