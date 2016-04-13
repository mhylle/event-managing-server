var express = require('express');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var config = require('./libs/config');
var oauth2 = require('./security/oauth2');
// var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');

var log = require('./libs/log')(module);

var authController = require('./security/auth.controller');
var userController = require('./users/user.controller');
var groupController = require('./groups/group.controller');
var eventController = require('./events/event.controller');
var loginController = require('./security/login.controller');
mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info('Connected to the database');
});

var app = express();

// app.use(favicon);
app.use(morgan('combined'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(session({
    secret: 'em-top-secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
require('./security/oauth');
app.post('/oauth/token/', oauth2.token);
app.get('/api/userInfo',
passport.authenticate('bearer', {session:false}),
function (req,res) {
    res.json({user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope})
});

var router = express.Router();

//<editor-fold desc="security">
router.route('/login')
    .post(loginController.login);

// router.route('/oauth2/auth')
//     .get(authController.authorization)
//     .post();
// router.route('/oauth2/token')
//     .get();
//</editor-fold>

//<editor-fold desc="Users">
router.route('/users')
    .post(userController.postUser)
    .get(userController.getUsers);


router.route('/users/:id')
    .get(userController.getUser)
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
app.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});