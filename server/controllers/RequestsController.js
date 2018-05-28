import database from '../models/database';

class RequestsController {
  static createRequest(req, res) {
    const dbQuery = (`${'insert into requests (userid,title,description,priority,status)' +
    "values ('"}${req.decoded.id}','${req.body.title}','${req.body.description}','${req.body.priority}','${1}')`);

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      }
      return res.status(201).json({

        status: 'success',
        message: 'Request Created Successfully!',
        data: {
          title: req.body.title,
          description: req.body.description,
          priority: req.body.priority,
          userid: req.decoded.id,
        },
      });
    });
  }

  static getAllRequests(req, res) {
    const dbQuery = (`SELECT title, description, priority, values FROM requests INNER JOIN request_status ON requests.status = request_status.id WHERE requests.userid= '${req.decoded.id}'`);

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      } else if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'User does not have a reqeuest yet!',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Requests found',
        data: {
          requests: response.rows,
        },
      });
    });
  }
}

export default RequestsController;

