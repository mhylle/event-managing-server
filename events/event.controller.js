"use strict";

var Event = require('./event');
var User = require('../users/user');
var Location = require('../locations/location');
var User = require('../users/user');

function retrieveUserlist(users, done) {
    if (users) {
        User.find({_id: {$in: users}}, function (error, users) {
            if (error) {
                done(error, null);
            } else {
                return done(null, users);
            }
        });
    }
    done(null, null);
}
function retrieveLocations(locations, done) {
    if (locations) {
        var locationArray = JSON.parse(locations);

    }
    done(null, null);
}

// kav@zertify.co
// 5711fbd7fdfdf8bc3433ea12
// 5711fbe4fdfdf8bc3433ea13

function saveEvent(req, locations, users, res) {
    var event = new Event({
        name: req.body.name,
        avatar: req.body.avatar || null,
        start: req.body.start,
        end: req.body.end,
        signstart: req.body.signstart,
        signend: req.body.signend,
        canceldeadline: req.body.canceldeadline,
        description: req.body.description,
        memberprice: req.body.memberprice,
        nonmemberprice: req.body.nonmemberprice,
        defaultprice: req.body.defaultprice,
        location: locations,
        users: users
    });

    event.save(req, function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/events/' + event._id});
    });
}
exports.postEvent = function (req, res) {
    var locations = null;
    var users = null;
    if (req.body.location) {
        var locationArray = JSON.parse(req.body.location);
        Location.find({_id: {$in: locationArray}}, function (error, locations) {
            if (error) {
                return res.send(error);
            }

            saveEvent(req, locations, users, res);
        });
    } else {
        saveEvent(req, null, users, res);
    }

}

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
    });
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
    Event.findOne(req.param.id, function (error, event) {
        if (error) {
            res.send(error);
        } else {
            event.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });

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
                res.json({location: '/api/events/' + event._id});
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