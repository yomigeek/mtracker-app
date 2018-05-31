class Validate {
  static checkRequestInputs(req, res, next) {
    const titleRequest = req.body.title.trim();
    const descriptionRequest = req.body.description;
    const priorityRequest = req.body.priority.trim();

    if ((!titleRequest) || (!descriptionRequest) || (!priorityRequest)) {
      return res.status(500).json({
        status: 'fail',
        message: 'API Request missing or cannot be empty! Request must include title, description or priority.',
      });
    }

    const title = titleRequest;
    const description = descriptionRequest;
    const priority = priorityRequest.toLowerCase();
    const trimedTitle = title.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedDescription = description.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedPriority = priority.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

    if (!title) {
      return res.status(400).json({
        status: 'fail',
        message: 'title cannot be empty!',
      });
    } else if (title.length < 6) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title must be more than 6 characters',
      });
    } else if (trimedTitle.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title cannot be empty!',
      });
    } else if (!description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description field cannot be empty!',
      });
    } else if (description.length < 10) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description must be more than 10 characters!',
      });
    } else if (trimedDescription.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Description must be more than 10 characters!',
      });
    } else if (!priority) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority field cannot be empty!',
      });
    } else if (trimedPriority.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority must have a value!',
      });
    } else if ((priority != 'high') && (priority != 'medium') && (priority != 'low')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Priority must be either low, medium or high',
      });
    } next();
  }

  static signUpValidate(req, res, next) {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const department = req.body.department.trim();
    const password = req.body.password.trim();
    const trimedusername = username.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedEmail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedDepartment = department.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedPassword = password.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regularExpressionOthers = /^[a-zA-Z0-9- ]*$/;

    if (!username) {
      return res.status(400).json({
        status: 'fail',
        message: 'username cannot be empty!',
      });
    } else if (username.length < 3) {
      return res.status(400).json({
        status: 'fail',
        message: 'username must be more than 3 or characters',
      });
    } else if (!regularExpressionOthers.test(username)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong username format! Can only contain spaces, hypens as special characters',
      });
    } else if (trimedusername.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'username cannot be empty',
      });
    } else if (!email) {
      return res.status(400).json({
        status: 'fail',
        message: 'email cannot be empty!',
      });
    } else if (!regularExpressionEmail.test(email)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong email format!',
      });
    } else if (trimedEmail.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email cannot be empty!',
      });
    } else if (!department) {
      return res.status(400).json({
        status: 'fail',
        message: 'department cannot be empty!',
      });
    } else if (department.length < 2) {
      return res.status(400).json({
        status: 'fail',
        message: 'department name must be 2 or more characters',
      });
    } else if (!regularExpressionOthers.test(department)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong department name format! Can only contain spaces, hypens as special characters',
      });
    } else if (trimedDepartment.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Department cannot be empty!',
      });
    } else if (!password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password cannot be empty!',
      });
    } else if (password.length < 5) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password must be 5 characters and above',
      });
    } else if (trimedPassword.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password cannot be empty!',
      });
    }

    next();
  }

  static checkLogin(req, res, next) {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const trimedEmail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedPassword = password.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      return res.status(400).json({
        status: 'fail',
        message: 'email cannot be empty!',
      });
    } else if (!regularExpressionEmail.test(email)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong email format!',
      });
    } else if (trimedEmail.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email cannot be empty!',
      });
    } else if (!password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password cannot be empty!',
      });
    } else if (trimedPassword.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password cannot be empty!',
      });
    }
    next();
  }
}

export default Validate;
