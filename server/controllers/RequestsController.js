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
    const dbQuery = (`SELECT title, description, priority, values FROM requests 
    INNER JOIN request_status ON requests.status = request_status.id 
    WHERE requests.userid= '${req.decoded.id}'`);

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

  static getRequestById(req, res) {
    const dbQuery = (`SELECT title, description, priority, values FROM requests 
    INNER JOIN request_status ON requests.status = request_status.id 
    WHERE requests.userid= '${req.decoded.id}' AND requests.id= '${req.params.requestId}' `);

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      } else if (response.rows.length < 1) {
        return res.status(404).json({

          status: 'fail',
          message: 'This request does not belong to or exist for this User!',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Requests found',
        data: {
          requests: response.rows[0],
        },
      });
    });
  }

  static approveRequest(req, res) {
    const dbQuery = (`SELECT title, description, priority, values 
    FROM requests INNER JOIN request_status ON 
    requests.status = request_status.id
    WHERE requests.userid= '${req.decoded.id}' AND requests.id= '${req.params.requestId}' `);

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      } else if (response.rows.length < 1) {
        return res.status(404).json({

          status: 'fail',
          message: 'This request does not belong to or exist for this User!',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Requests found',
        data: {
          requests: response.rows[0],
        },
      });
    });
  }

  static editRequest(req, res) {
    const dbQuery = (`UPDATE requests SET 
      title = '${req.body.title}',
      description = '${req.body.description}',
      priority = '${req.body.priority}'

      WHERE id = '${req.params.requestId}' AND status = ${1} RETURNING *`);

    database.query(dbQuery, (err, response) => {
      if (err) {
        throw err;
      }
      if (response.rows.length < 1) {
        return res.status(400).json({

          status: 'fail',
          message: 'Sorry! Cannot modify an approved or declined request.',
        });
      }

      return res.status(200).send({
        status: 'success',
        message: 'Request updated successfully!',
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

export default RequestsController;

