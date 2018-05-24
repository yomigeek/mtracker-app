import models from '../models/Users';

class UsersController {
  static createUsers(req, res) {
    models.userSignUp(req, res);
  }
}

export default UsersController;
