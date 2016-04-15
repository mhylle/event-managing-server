"use strict";

var Event = require('./event');
var User = require('../users/user');

exports.postEvent = function (req, res) {
    var event = new Event({
        name: req.body.name,
        type: req.body.type,
        avatar: req.body.avatar || null
    });

    event.save(req, function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/events/' + event._id});
    });
};

exports.getEvents = function (req, res) {
    Event.find(function (error, events) {
        if (error) {
            return res.send(error);
        }

        res.json(events);
    });
};

exports.getEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }
        res.json(event);
    })
};

exports.putEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }

        event.name = req.body.name;
        event.type = req.body.type;
        event.avatar = req.body.avatar || null;

        event.save(req, function (error) {
            if (error) {
                return res.send(error);
            }
            res.json({location: '/api/events/' + event._id});
        });
    });
};

exports.deleteEvent = function (req, res) {
    Event.remove({_id: req.param.id}, function (error) {
        if (error) {
            res.send(error);
        } else {
            res.send({message: 'deleted'});
        }
    });
};

exports.addUserToEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }
        User.findOne({_id: req.params.uid}, function (error, user) {
            if (error) {
                return res.send(error);
            }
            event.users.push(user);
            event.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/events/' + group._id});
            });
        });
    });
};

exports.removeUserFromEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }
        User.findOne({_id: req.params.uid}, function (error, user) {
            if (error) {
                return res.send(error);
            }

            event.users.pull(user);
            event.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/events/' + event._id});
            });
        });
    });
};