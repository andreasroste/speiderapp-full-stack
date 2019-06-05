const express = require('express')
const app = express()

var rollbar = require('./helpers/rollbar') // Logger


// Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enable CORS
const cors = require('cors')
app.use(cors({
  credentials: true
}));


// Controllers
const loginController = require('./controllers/login');
const speidingnoeventsController = require('./controllers/speidingnoevents');
const speidingnosingleeventController = require('./controllers/speidingnosingleevent');
const profileController = require('./controllers/profileController');


// Routes
app.post('/login', loginController);
app.get('/events', speidingnoeventsController);
app.get('/event/:id', speidingnosingleeventController);
app.get('/profileimage', profileController.image);
app.post('/logout', (req,res) =>{
  req.session.destroy();
})


//app.use(rollbar.errorHandler()) // Handling errors

module.exports = app