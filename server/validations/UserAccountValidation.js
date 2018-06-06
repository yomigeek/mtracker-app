import Joi from 'joi';
import { userSignUpSchema, userLoginSchema, userRequestSchema } from '../validations/Schemas';
import options from '../validations/JoiCustomMessages';

// User Signup Validation
const userSignUpValidate = (req, res, next) => {
  if ((!req.body.username) || (!req.body.password) || (!req.body.email) || (!req.body.department)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Signup data is missing or cannot be empty! Must provide username, email, password, department',
    });
  }

  const userDetails = {
    username: req.body.username.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    password: req.body.password.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    email: req.body.email.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    department: req.body.department.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
  };

  Joi.validate(userDetails, userSignUpSchema, options, (err) => {
    if (!err) {
      return next();
    }
    return res.status(422).json({
      status: 'fail',
      message: err.details[0].message,
    });
  });
};


// User Login Validation
const userLoginValidate = (req, res, next) => {
  if ((!req.body.email) || (!req.body.password)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Login data is missing or cannot be empty! Must provide email, password',
    });
  }

  const loginDetails = {
    email: req.body.email.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    password: req.body.password.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
  };

  Joi.validate(loginDetails, userLoginSchema, options, (err) => {
    if (!err) {
      return next();
    }
    return res.status(422).json({
      status: 'fail',
      message: err.details[0].message,
    });
  });
};


// User Request Validation
const userRequestValidate = (req, res, next) => {
  if ((!req.body.title) || (!req.body.description) || (!req.body.priority)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Create Request data is missing or cannot be empty! Must provide title, description, priority',
    });
  }

  const priorityRequest = req.body.priority.toLowerCase();

  if ((priorityRequest != 'high') && (priorityRequest != 'medium') && (priorityRequest != 'low')) {
    return res.status(400).json({
      status: 'fail',
      message: 'Priority must be either low, medium or high',
    });
  }

  // const formattedPriority = req.body.priority.toLowerCase();
  const requestDetails = {
    title: req.body.title.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    description: req.body.description.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),
    priority: req.body.priority.replace(/^\s+|\s+$|\s+(?=\s)/g, '').trim(),

  };

  Joi.validate(requestDetails, userRequestSchema, options, (err) => {
    if (!err) {
      return next();
    }
    return res.status(422).json({
      status: 'fail',
      message: err.details[0].message,
    });
  });
};

export { userSignUpValidate, userLoginValidate, userRequestValidate };
