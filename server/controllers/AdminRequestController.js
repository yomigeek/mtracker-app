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

  static adminRequestProcess(req, res) {
    let dbQuery;
    let failMessage;
    let succesMessage;
    const requestProcessByAdmin = res.locals.value;
    const approveDbQuery = (`UPDATE requests SET status = ${2}  WHERE id = '${req.params.requestId}' AND status = ${1} RETURNING *`);

    const declineDbQuery = (`UPDATE requests SET status = ${3}  WHERE id = '${req.params.requestId}' AND status = ${1} RETURNING *`);

    const resolveDbQuery = (`UPDATE requests SET status = ${4}  WHERE id = '${req.params.requestId}' AND status = ${2} RETURNING *`);

    if (requestProcessByAdmin == 'approve') {
      dbQuery = approveDbQuery;
      failMessage = 'This process is not on pending, so cannot be approved!';
      succesMessage = 'This Request has been approved successfully!';
    } else if (requestProcessByAdmin == 'decline') {
      dbQuery = declineDbQuery;
      failMessage = 'This process is not on pending, so cannot be declined!';
      succesMessage = 'This Request has been declined successfully!';
    } else if (requestProcessByAdmin == 'resolve') {
      dbQuery = resolveDbQuery;
      failMessage = 'This process has not been approved, so cannot be resolved!';
      succesMessage = 'This Request has been resolved successfully!';
    } else {
      return res.status(400).json({

        status: 'fail',
        message: 'This action is not allowed on requests by admin!',
      });
    }

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      }
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: failMessage,
        });
      }

      return res.status(200).send({
        status: 'success',
        message: succesMessage,
        data: {
          id: response.rows[0].id,
          title: response.rows[0].title,
          description: response.rows[0].description,
          priority: response.rows[0].priority,
        },
      });
    });
  }
}

export default AdminRequestController;

