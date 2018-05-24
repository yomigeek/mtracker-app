class Validate {
  static checkRequestInputs(req, res, next) {
    const titleRequest = req.body.title;
    const descriptionRequest = req.body.description;
    const priorityRequest = req.body.priority;

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
    } else if (title.length < 10) {
      return res.status(400).json({
        status: 'fail',
        message: 'Title must be more than 10 characters',
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
    const fullname = req.body.fullname;
    const email = req.body.email;
    const department = req.body.department;
    const password = req.body.password;
    const trimedFullname = fullname.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedEmail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedDepartment = department.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const trimedPassword = password.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regularExpressionOthers = /^[a-zA-Z0-9- ]*$/;

    if (!fullname) {
      return res.status(400).json({
        status: 'fail',
        message: 'fullname cannot be empty!',
      });
    } else if (fullname.length < 2) {
      return res.status(400).json({
        status: 'fail',
        message: 'fullname must be more than 2 characters',
      });
    } else if (!regularExpressionOthers.test(fullname)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong fullname format! Can only contain spaces, hypens as special characters',
      });
    } else if (trimedFullname.length <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Fullname cannot be empty',
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
    const email = req.body.email;
    const password = req.body.password;
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
