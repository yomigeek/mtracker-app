import requests from './dummyData/requests';

class UserRequestController {
  static getAllRequests(req, res) {
    return res.status(200).json({
      status: 'success',
      data: {
        requests,
      },
    });
  }


  static createRequest(req, res) {
    const newRequest = ({
      id: requests.length + 1,
      title: req.body.title,
      description: req.body.description,
      date: '2018-18-05',
      status: 'open',
      priority: req.body.priority,
      userId: 111,
    });
    requests.push(newRequest);
    return res.status(201).json({

      status: 'success',
      message: 'Request created successfully!',
      data: {
        requests: newRequest,
      },
    });
  }

  static getRequestByRequestId(req, res) {
    const findByIdQuery = requestFinder => requestFinder.id == req.params.requestId;
    const findARequest = requests.find(findByIdQuery);
    if (!findARequest) {
      return res.status(404).json({

        status: 'fail',
        message: 'Request not found!',
      });
    }
    return res.status(200).json({

      status: 'success',
      message: 'Request found',
      data: {
        requests: findARequest,
      },
    });
  }
}

export default UserRequestController;
