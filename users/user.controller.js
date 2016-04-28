/* jshint node: true */

"use strict";

var User = require('./user');

exports.postUser = function (req, res) {
    var user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        middlename: req.body.middlename || null,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone || null,
        birthday: req.body.birthday || null,
        avatar: req.body.avatar || null
    });

    user.save(req, function (error) {
        if (error) {
            res.send(error);
        } else {
            res.json({location: '/api/users/' + user._id});
        }
    });
};

exports.getUsers = function (req, res) {
    User.find(function (error, users) {
        if (error) {
            return res.send(error);
        }
        res.json(users);
    });
};
exports.getUserByUsername = function (req, res) {
    User.findOne({username: req.params.username}, function (error, user) {
        if (error) {
            res.send(error);
        } else {
            res.json(user);
        }
    });
};

exports.getUserById = function (req, res) {
    User.findOne({_id: req.params.id}, function (error, user) {
        if (error) {
            res.send(error);
        } else {
            res.json(user);
        }
    });
};

exports.putUser = function (req, res) {
    //TODO implement
};

exports.deleteUser = function (req, res) {
    User.findOne(req.param.id, function (error, user) {
        if (error) {
            res.send(error);
        } else {
            user.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });
        }
    });
};