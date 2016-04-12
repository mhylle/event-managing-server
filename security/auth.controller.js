// /**
//  * Created by mah on 05-04-2016.
//  */
// var passport = require('passport');
// // var BasicStrategy = require('passport-http').BasicStrategy;
// var OAuth2Strategy = require('passport-oauth2');
// var User = require('../users/user');
//
// passport.use(new OAuth2Strategy({
//     authorizationURL: 'oauth2/auth',
//     tokenURL: 'oauth2/token',
//     clientID: 'clientID',
//     clientSecret: 'clientSecret',
//     callbackURL: 'oauth/callback'
// }, function (accessToken, refreshToken, profile, callback) {
//     User.find({id: profile.id}, function (error, user) {
//         return callback(error, user);
//     });
// }));
//
// exports.authorization = function (req, res, next) {
//     res.json({message: 'logging in..'});
// };
// // passport.use(new BasicStrategy(
// //     function (username, password, callback) {
// //         User.findOne({username: username}, function (error, user) {
// //             if (error) {
// //                 return callback(error)
// //             }
// //
// //             if (!user) {
// //                 return callback(null, false)
// //             }
// //             user.verifyPassword(password, function (error, isMatch) {
// //                 if (error) {
// //                     return callback(error)
// //                 }
// //                 if (!isMatch) {
// //                     return callback(null, false)
// //                 }
// //
// //                 return callback(null, user);
// //             })
// //         })
// //     }
// // ));
//
// // exports.isAuthenticated = passport.authenticate('basic', {session: false});
// exports.isAuthenticated = passport.authenticate('oauth2', {failureRedirect: '/login'},
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });
