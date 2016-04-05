var express = require('express');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var authController = require('./security/auth.controller');
var userController = require('./users/user.controller');
mongoose.connect('mongodb://localhost:27017/event-managing');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'em-top-secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());

var router = express.Router();

router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);