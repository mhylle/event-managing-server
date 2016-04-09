/**
 * Created by mah on 05-04-2016.
 */
var Group = require('./group');
var User = require('../users/user');

exports.postGroup = function (req, res) {
    var group = new Group({
        name: req.body.name,
        avatar: req.body.avatar ? req.body.avatar : null
    });

    group.save(req, function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/groups/' + group._id});
    });
};

exports.getGroups = function (req, res) {
    Group.find(function (error, groups) {
        if (error) {
            return res.send(error);
        }

        res.json(users);
    });
};

exports.getGroup = function (req, res) {
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }
        res.json(group);
    })
};

exports.putGroup = function (req, res) {
    // todo implement
};

exports.deleteGroup = function (req, res) {
    Group.remove({_id: req.param.id}, function (error) {
        if (error) {
            res.send(error);
        } else {
            res.send({message: 'deleted'});
        }
    });
};

exports.addUserToGroup = function (req, res) {
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }
        User.findOne({_id: req.params.uid}, function (error, user) {
            if (error) {
                return res.send(error);
            }
            group.users.push(user);
            group.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/groups/' + group._id});
            });
        });
    });
};