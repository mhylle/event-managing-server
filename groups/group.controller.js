"use strict";

var Group = require('./group');
var User = require('../users/user');
var Event = require('../events/event');

exports.postGroup = function (req, res) {
    var group = new Group({
        name: req.body.name,
        type: req.body.type,
        avatar: req.body.avatar ? req.body.avatar : null,
        users: req.body.users ? req.body.users.length > 0 ? JSON.parse(req.body.users) : null : null,
        events: req.body.events ? req.body.events.length > 0 ? JSON.parse(req.body.events) : null : null,
        administrators: req.body.administrators ? req.body.administrators.length > 0 ? JSON.parse(req.body.administrators) : null : null
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
    });
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

exports.deleteGroupById = function (req, res) {
    Group.findOne(req.param._id, function (error, group) {
        if (error) {
            res.send(error);
        } else {
            group.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });

        }
    });
};

exports.deleteGroupByName = function (req, res) {
    Group.findOne(req.body.name, function (error, group) {
        if (error) {
            res.send(error);
        } else {
            group.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });

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
            if (!group.users) {
                group.users = [];
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

exports.addEventToGroup = function (req, res) {
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }
        Event.findOne({_id: req.params.eid}, function (error, event) {
            if (error) {
                return res.send(error);
            }
            group.events.push(event);
            group.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/groups/' + group._id});
            });
        });
    });
};

exports.removeEventFromGroup = function (req, res) {
    Group.findOne({_id: req.params.id}, function (error, group) {
        if (error) {
            return res.send(error);
        }
        Event.findOne({_id: req.params.eid}, function (error, event) {
            if (error) {
                return res.send(error);
            }

            group.events.pull(event);
            group.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/groups/' + group._id});
            });
        });
    });
};

exports.isAuthorized = function (req, res) {
    return true;
    // todo figure out how to verify that the current user has access to the thing being tested.
};