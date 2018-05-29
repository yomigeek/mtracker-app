import express from 'express';
import UserSignUpController from '../controllers/UserSignUpController';
import UserLoginController from '../controllers/UserLoginController';
import RequestsController from '../controllers/RequestsController';
import AdminRequestController from '../controllers/AdminRequestController';
import UserRequestController from '../controllers/UserRequestController';
import CheckExistingUser from '../middlewares/CheckExistingUser';
import CheckRequest from '../middlewares/CheckRequest';
import RequestTypeSelector from '../middlewares/RequestTypeSelector';
import Validate from '../validations/Validate';
import CheckRole from '../validations/CheckRole';

import auth from '../auth';

const routes = express.Router();


// DEFAULT message
routes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the mTracker API',
}));

// User API Routes

// Get all requests in the dummy data
// routes.get('/users/requests', UserRequestController.getAllRequests);
// Create Request to a dummy data
// routes.post('/users/requests', Validate.checkRequestInputs, UserRequestController.createRequest);
// Get a user request detail dummy data
// routes.get('/users/requests/:requestId', UserRequestController.getRequestByRequestId);
// Modify Request details by requestId
routes.put('/users/requests/:requestId', Validate.checkRequestInputs, UserRequestController.editRequest);

// Persistent Data

// Sign user up
routes.post('/auth/signup', Validate.signUpValidate, CheckExistingUser.checker, UserSignUpController.userSignUp);
// Sign login
routes.post('/auth/login', Validate.checkLogin, UserLoginController.userLogin);
// Get all logged in user requests
routes.get('/users/requests', auth, RequestsController.getAllRequests);
// Create a request in DB
routes.post('/users/requests', auth, Validate.checkRequestInputs, RequestsController.createRequest);
// Get a user request detail
routes.get('/users/requests/:requestId', auth, RequestsController.getRequestById);
// Get all requests by ADMIN
routes.get('/requests', auth, CheckRole.checkIfAdmin, AdminRequestController.getAllRequests);
// Approve User Request
routes.put(
  '/requests/:requestId/approve', auth, CheckRole.checkIfAdmin,
  CheckRequest.existingRequest, RequestTypeSelector.approve,
  AdminRequestController.adminRequestProcess,
);


export default routes;
