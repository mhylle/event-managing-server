var express = require('express');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var authController = require('./security/auth.controller');
var userController = require('./users/user.controller');
var groupController = require('./groups/group.controller');
var eventController = require('./events/event.controller');
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


//<editor-fold desc="Users">
router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);


router.route('/users/:id')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);
//</editor-fold>

//<editor-fold desc="Groups">
router.route('/groups')
    .post(authController.isAuthenticated, groupController.postGroup)
    .get(authController.isAuthenticated, groupController.getGroups);

router.route('/groups/:id')
    .get(authController.isAuthenticated, groupController.getGroup)
    .put(authController.isAuthenticated, groupController.putGroup)
    .delete(authController.isAuthenticated, groupController.deleteGroup);
router.route('/groups/:id/users/:uid')
    .post(authController.isAuthenticated, groupController.addUserToGroup);
router.route('/groups/:id/users/:uid')
    .delete(authController.isAuthenticated, groupController.removeUserFromGroup);
//</editor-fold>

//<editor-fold desc="Events">
router.route('/events')
    .post(authController.isAuthenticated, groupController.isAuthorized, eventController.postEvent)
    .get(authController.isAuthenticated, groupController.isAuthorized, eventController.getEvents);

router.route('/events/:id')
    .get(authController.isAuthenticated, groupController.isAuthorized, eventController.getEvent)
    .put(authController.isAuthenticated, groupController.isAuthorized, eventController.putEvent)
    .delete(authController.isAuthenticated, groupController.isAuthorized, eventController.deleteEvent);
router.route('/events/:id/users/:uid')
    .post(authController.isAuthenticated, groupController.isAuthorized, eventController.addUserToEvent);
router.route('/events/:id/users/:uid')
    .delete(authController.isAuthenticated, groupController.isAuthorized, eventController.removeUserFromEvent);
//</editor-fold>

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);