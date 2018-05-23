import database from '../models/database';

class CheckExistingUser {
  static checker(req, res, next) {
    database.query(`SELECT id, role FROM users WHERE email= '${req.body.email}'`, (err, response) => {
      if (response.rows.length > 0) {
        return res.status(400).json({

          status: 'fail',
          message: 'User Already Exist!',
        });
      } next();
    });
  }
}

export default CheckExistingUser;

