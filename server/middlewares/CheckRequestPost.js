import database from '../models/database';

class CheckRequestPost {
  static checker(req, res, next) {
    const dbQuery = `SELECT * FROM requests 
    WHERE title = '${req.body.title}' AND description = '${req.body.description}' AND userId = '${req.decoded.id}'`;
    database.query(dbQuery, (err, response) => {
      if (response.rows.length > 0) {
        return res.status(400).json({

          status: 'fail',
          message: 'Similar Request Already Exist! Perhaps you can reframe your request details',
        });
      } next();
    });
  }
}

export default CheckRequestPost;

