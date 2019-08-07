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
const userProfilesController = require('./controllers/getUserProfiles');


// Routes
app.post('/login', loginController);
app.get('/404', (req,res) =>{ res.status(404); rollbar.info('404 was visited.'); })
app.get('/events', speidingnoeventsController);
app.get('/event/:id', speidingnosingleeventController);
app.get('/profileimage', profileController.image);
app.get('/memberships', profileController.memberships);
app.get('/getmembers/group/:groupid', userProfilesController.group);
app.post('/logout', (req,res) =>{
  req.session.destroy();
  res.status(200);
})


app.use(rollbar.errorHandler()) // Handling errors

module.exports = app