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
}

export default RequestsController;

