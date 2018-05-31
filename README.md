# My-MTracker-App
[![Build Status](https://travis-ci.org/yomigeek/mtracker-app.svg?branch=develop)](https://travis-ci.org/yomigeek/mtracker-app) [![Coverage Status](https://coveralls.io/repos/github/yomigeek/mtracker-app/badge.svg?branch=develop)](https://coveralls.io/github/yomigeek/mtracker-app?branch=ch-coveralls-implementation-157738024) [![Maintainability](https://api.codeclimate.com/v1/badges/78fc5727a7bace58a50d/maintainability)](https://codeclimate.com/github/yomigeek/mtracker-app/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/78fc5727a7bace58a50d/test_coverage)](https://codeclimate.com/github/yomigeek/mtracker-app/test_coverage)


## Description
The Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

### Technologies
* HyperText Mark-up Language (HTML)
* Cascade Style Sheet (CSS)
* Vanilla Javascript
* Nodejs Express framework
* PostgreSQL Database 
 
### Pivotal Tracker
The Maintenance Tracker App Project is currently managed with the Pivotal Tracker Project Management Tool.
You can find the project management board on (https://www.pivotaltracker.com/n/projects/2171607)

### Template
Application User Interface Template is hosted at (https://yomigeek.github.io/mtracker-app/UI/)

### Application API Documentation
The API Documentation is hosted at (https://mtracker1.docs.apiary.io)

### Persistent API Enpoint
Persistent API Endpoints is hosted at (https://mtrack-app.herokuapp.com/api/v1)

### Features

#### Users
* Application Homepage
* Signup and Login
* Create Request Page
* Edit Request Page
* Resolved Requests Page
* Pending Requests Page
* Declined Requests Page
* Main Dashboard Page

#### Admin
* Application Homepage
* Login
* Main Dashboard
* Resolved Requests Page
* Declined Requests Page
* Pending Requests Page
* Confirm Request Page


## Non-Persistent Data API Endpoints

###

<table>

<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>POST</td> <td>api/v1/users/requests</td> <td>Create A Request</td></tr>

<tr><td>GET</td> <td>api/v1/users/requests</td> <td>Get All User Requests</td></tr>

<tr><td>GET</td> <td>api/v1/users/requests/:requestId</td> <td>Get An Existing Request Detail by Request Id</td></tr>

<tr><td>PUT</td> <td>api/v1/users/requests/:requestId</td>  <td> Modify an  Existing Request Detail By Request Id</td></tr>

</table>

## Getting Started

### Installation 

* Create a folder on your computer and navigate to the folder using your terminal
* git clone https://github.com/yomigeek/mtracker-app.git
* Run `npm install` to install packages and dependencies
* Run `npm run start` to start the server
* Navigate to http://localhost:5000/ on your browser to have access to the M-Tracker application

#### Prerequisites

* To try out the endpoints, use the POSTMAN API Toolchain, visit https://getpostman.com

#### Testing with Postman

* After successful installation as stated above
* Navigate to http://localhost:5000/ on the Postman App
* Try out any of the API endpoints
* Enjoy! 

#### Create A Request /api/v1/users/requests

To create a request, post the following parameters

NB: All fields are required and priority can either be low, medium or high

```
{
   title: "laptop computers",
   description: "laptop is faulty and processor is fried",
   prority: "low"
}

```

#### Get All Requests /api/v1/users/requests
Send a get request method to /api/v1/users/requests

#### Get Request detail by Id /api/v1/users/requests/:requestId
Send a get request method to /api/v1/users/requests/requestId

#### Modify a Request by Id /api/v1/users/requests/:requestId
Send a put request method to /api/v1/users/requests/requestId with the following parameters

NB: All fields are required and priority can either be low, medium or high

```
{
   title: "laptop computers",
   description: "laptop is faulty and processor is fried",
   prority: "low"
}

```


### Author 
Abayomi Olaoye
