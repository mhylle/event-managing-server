/**
 * Created by mah on 05-04-2016.
 */
var _ = require('lodash');
var Group = require('./group');
var User = require('../users/user');

exports.postGroup = function (req, res) {
    var group = new Group({
        name: req.body.name,
        type: req.body.type,
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

        res.json(groups);
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
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }

        group.name = req.body.name;
        group.type = req.body.type;
        group.avatar = req.body.avatar ? req.body.avatar : null;

        group.save(req, function (error) {
            if (error) {
                return res.send(error);
            }
            res.json({location: '/api/groups/' + group._id});
        });
    });
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

exports.removeUserFromGroup = function (req, res) {
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }
        User.findOne({_id: req.params.uid}, function (error, user) {
            if (error) {
                return res.send(error);
            }

            group.users.pull(user);
            group.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/groups/' + group._id});
            });
        });

    });
};