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
}

export default UserRequestController;
