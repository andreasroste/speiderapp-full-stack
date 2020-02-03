const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');

var rollbar = require('./helpers/rollbar') // Logger


// Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_zvk6tbc1:m8kao2cj6r12g65ml2ejulpcos@ds055842.mlab.com:55842/heroku_zvk6tbc1', (err) => {
  if(err) throw err;
});



// Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enable CORS
const cors = require('cors')
app.use(cors({
  credentials: true
}));

// Configure Morgan
app.use(morgan('combined'));


// Controllers
const loginController = require('./controllers/login');
const speidingnoeventsController = require('./controllers/speidingnoevents');
const speidingnosingleeventController = require('./controllers/speidingnosingleevent');
const profileController = require('./controllers/profileController');
const userProfilesController = require('./controllers/getUserProfiles');
const forumController = require('./controllers/forum');


// Routes
app.post('/login', loginController);
app.get('/404', (req,res) =>{ res.status(404); rollbar.info('404 was visited.'); })
app.get('/events', speidingnoeventsController);
app.get('/event/:id', speidingnosingleeventController);
app.get('/profileimage', profileController.image);
app.get('/memberships', profileController.memberships);
app.get('/forum/cats', forumController.getCategories);
app.get('/forum/traads', forumController.getPosts);
app.post('/forum/create/category', forumController.createCategory);
app.post('/forum/create/post', forumController.createPost);
app.post('/forum/create/comment', forumController.createComment);
app.get('/getmembers/group/:groupid', userProfilesController.group);
app.post('/logout', (req,res) =>{
  req.session.destroy();
  res.status(200);
})
app.get('/session', (req,res) => {
  res.status(200).json({
    session: req.session
  })
})


app.use(rollbar.errorHandler()) // Handling errors

module.exports = app