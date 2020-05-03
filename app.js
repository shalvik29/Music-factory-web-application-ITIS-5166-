var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/musicFactory', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`We are connected to the musicFactory database`);
});

app.set('view engine', 'ejs');
app.use('/assets/stylesheets', express.static('assets/stylesheets'));
app.use('/assets/images', express.static('assets/images'));

var connectionsRouter = require('./controller/connectionController');
var addConnectionRouter = require('./controller/addConnectionController');
var userProfileRouter = require('./controller/userProfileController');

app.use(session({secret: 'user'}));

//middleware
app.use('/connections',connectionsRouter);
app.use('/savedConnections', userProfileRouter);
app.use('/signout', userProfileRouter);
app.use('/addConnection', addConnectionRouter);

//routes 
app.get('/index', function(req,res) {
    res.render('index', {loggedIn : (req.session.users) ? true: false});
});

app.get('/about', function(req,res) {
    res.render('about', {loggedIn : (req.session.users) ? true: false});
});

app.get('/contact', function(req,res) {
    res.render('contact', {loggedIn : (req.session.users) ? true: false});
});

app.get('/newConnection', function(req,res) {
    res.render('newConnection', {loggedIn : (req.session.users) ? true: false, errors: false});
});

app.get('/login', function(req,res) {
    res.render('login', {loggedIn : (req.session.users) ? true: false, errors: false});
});

app.get('/', function(req,res) {
    res.render('login', {loggedIn : (req.session.users) ? true: false, errors:false});
});

app.get('/*', function(req,res) {
    res.render('index', {loggedIn : (req.session.users) ? true: false});
});

app.listen(8084);