import database from '../models/database';

class AdminRequestController {
  static getAllRequests(req, res) {
    const dbQuery = ('SELECT title, description, priority, values FROM requests INNER JOIN request_status ON requests.status = request_status.id');

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      }
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'No request exist yet!',
        });
      }

      return res.status(200).send({
        status: 'success',
        message: 'All Requests found',
        data: {
          requests: response.rows,
        },
      });
    });
  }
}

export default AdminRequestController;

