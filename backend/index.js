const express = require('express')
const app = express()

var rollbar = require('./helpers/rollbar') // Logger


// Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});


// Controllers
const loginController = require('./controllers/login')
const speidingnoeventsController = require('./controllers/speidingnoevents')


// Routes
app.post('/login', loginController)
app.get('/events', speidingnoeventsController)


app.use(rollbar.errorHandler()) // Handling errors

module.exports = app