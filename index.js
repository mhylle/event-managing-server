/* jshint node: true */

"use strict";

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

// var authController = require('./security/auth.controller');
var userController = require('./users/user.controller');
var groupController = require('./groups/group.controller');
var eventController = require('./events/event.controller');
var locationController = require('./locations/location.controller');
var loginController = require('./security/login.controller');
var datagenerator = require('./generateData');

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
// app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(session({
//     secret: 'em-top-secret',
//     saveUninitialized: true,
//     resave: true
// }));

app.use(passport.initialize());
// require('./security/oauth');
// app.post('/oauth/token', oauth2.token);
// app.get('/userInfo',
//     passport.authenticate('bearer', {session: false}),
//     function (req, res) {
//         res.json({user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope})
//     });

// app.use(function (req, res, next) {
//     res.status(404);
//     log.debug('URL not found: %s', req.url);
//     res.send({error: 'Not found'});
//     return;
// });

// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     log.error('Internal error(%d): %s', res.statusCode, err.message);
//     res.send({error: err.message});
//     return;
// });

// app.get('/ErrorExample', function (req, res, next) {
//     next(new Error('Random Error'));
// });

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
    .get(userController.getUserById)
    .put(userController.putUser)
    .delete(userController.deleteUser);
//</editor-fold>

//<editor-fold desc="Groups">
router.route('/groups')
    .post(groupController.postGroup)
    .get(groupController.getGroups);

router.route('/groups/:id')
    .get(groupController.getGroup)
    .put(groupController.putGroup)
    .delete(groupController.deleteGroupById);
router.route('/groups/:id/users/:uid')
    .post(groupController.addUserToGroup);
router.route('/groups/:id/users/:uid')
    .delete(groupController.removeUserFromGroup);
router.route('/groups/:id/events/:eid')
    .post(groupController.addEventToGroup);
router.route('/groups/:id/events/:eid')
    .delete(groupController.removeEventFromGroup);
//</editor-fold>

//<editor-fold desc="Events">
router.route('/events')
    .post(eventController.postEvent)
    .get(eventController.getEvents);

router.route('/events/:id')
    .get(eventController.getEvent)
    .put(eventController.putEvent)
    .delete(eventController.deleteEvent);
router.route('/events/:id/users/:uid')
    .post(eventController.addUserToEvent);
router.route('/events/:id/users/:uid')
    .delete(eventController.removeUserFromEvent);
router.route('/events/:id/locations/:lid')
    .post(eventController.addLocationToEvent);
router.route('/events/:id/locations/:lid')
    .delete(eventController.removeLocationFromEvent);
//</editor-fold>

//<editor-fold desc="Locations">
router.route('/locations')
    .post(locationController.postLocation)
    .get(locationController.getLocations);

router.route('/locations/:id')
    .get(locationController.getLocation)
    .put(locationController.putLocation)
    .delete(locationController.deleteLocation);
//</editor-fold>

//<editor-fold desc="DataGeneration">
router.route('/datageneration/superusers')
    .post(datagenerator.createSuperUsers)
    .delete(datagenerator.cleanSuperUsers);
router.route('/datageneration/groups')
    .post(datagenerator.createBaseGroups)
    .delete(datagenerator.cleanBaseGroups);
//</editor-fold>
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});