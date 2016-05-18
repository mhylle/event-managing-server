/* jshint node: true */

"use strict";
// var passport = require('passport');
var User = require('../users/user');
var UUID = require('../utils/uuid').generate();
exports.login = function (req, res, next) {
    var authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(401).json({message: 'No Authorization: Must supply credentials'});
    }

    var parts = authorization.split(' ');
    if (parts.length < 2) {
        return res.status(401).json({message: 'Must supply credentials1'});
    }
    var credentials = new Buffer(parts[1], 'base64').toString().split(':');
    User.findOne({username: credentials[0]}, function (error, user) {
        if (error) {
            return res.send(error);
        }

        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }

        if (user.checkPassword(credentials[1])) {
            return res.status(200).json(
                {
                    accessToken: UUID.generate(),
                    user: {
                        _id: user._id,
                        username: user.username,
                        firstname: user.firstname,
                        middlename: user.middlename,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        birthday: user.birthday,
                        avatar: user.avatar
                    }
                });
        } else {
            return res.status(401).json({message: 'Password did not match'});
        }
    });
    // var callback = req.query.callback || '/profile';
    // passport.authenticate('local', function (error, user, info) {
    //     if (error || !user) {
    //         res.send('unable to login');
    //     }
    //
    //     req.logIn(user, function (error) {
    //         if (error) {
    //             return next(error);
    //         }
    //
    //         return res.redirect(callback);
    //     });
    // })(req, res, next);
};