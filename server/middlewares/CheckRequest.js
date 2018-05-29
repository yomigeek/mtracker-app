import database from '../models/database';

// Method to login the users with the required credentials
class CheckRequest {
  static existingRequest(req, res, next) {
    const dbQuery = `SELECT * FROM requests WHERE id= '${req.params.requestId}'`;
    database.query(dbQuery, (err, response) => {
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'Invalid Request Id',
        });
      }
      return next();
    });
  }
}


export default CheckRequest;

