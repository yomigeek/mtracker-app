import express from 'express';
import UserRequestController from '../controllers/UserRequestController';
import UserSignUpController from '../controllers/UserSignUpController';
import CheckExistingUser from '../middlewares/CheckExistingUser';
import Validate from '../validations/Validate';

const routes = express.Router();


// DEFAULT message
routes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the mTracker API',
}));

// User API Routes

// Get all requests in the dummy data
routes.get('/users/requests', UserRequestController.getAllRequests);
// Create Request to a dummy data
routes.post('/users/requests', Validate.checkRequestInputs, UserRequestController.createRequest);
// Get a user request detail
routes.get('/users/requests/:requestId', UserRequestController.getRequestByRequestId);
// Modify Request details by requestId
routes.put('/users/requests/:requestId', Validate.checkRequestInputs, UserRequestController.editRequest);
// Sign user up
routes.post('/auth/signup', Validate.signUpValidate, CheckExistingUser.checker, UserSignUpController.userSignUp);


export default routes;
