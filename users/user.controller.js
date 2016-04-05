/**
 * Created by mah on 05-04-2016.
 */
var User = require('./user');
var UUID = require('../utils/uuid');
exports.postUser = function (req, res) {

    var user = new User({
        id: req.body.id ? req.body.id : UUID.generate(),
        username: req.body.username,
        firstname: req.body.firstname,
        middlename: req.body.middlename ? req.body.middlename : null,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone ? req.body.phone : null,
        birthday: req.body.birthday ? req.body.birthday : null,
        avatar: req.body.avatar ? req.body.avatar : null
    });

    user.save(function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/users/' + user.id});
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

exports.putUser = function (req, res) {
    // todo implement
};

exports.deleteUser = function (req, res) {
    // todo implement
};