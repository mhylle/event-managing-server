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

function saveEvent(req, res, event) {
    var creation = false;
    if (!event) {
        creation = true;
        event = new Event();
    }
    event.name = req.body.name ? req.body.name : event.name;
    event.avatar = req.body.avatar ? req.body.avatar : event.avatar;
    event.start = req.body.start ? req.body.start : event.start;
    event.end = req.body.end ? req.body.end : event.end;
    event.signstart = req.body.signstart ? req.body.signstart : event.signstart;
    event.signend = req.body.signend ? req.body.signend : event.signend;
    event.canceldeadline = req.body.canceldeadline ? req.body.canceldeadline : event.canceldeadline;
    event.description = req.body.description ? req.body.description : event.description;
    event.memberprice = req.body.memberprice ? req.body.memberprice : event.memberprice;
    event.nonmemberprice = req.body.nonmemberprice ? req.body.nonmemberprice : event.nonmemberprice;
    event.defaultprice = req.body.defaultprice ? req.body.defaultprice : event.defaultprice;
    event.locations = req.body.locations ? JSON.parse(req.body.locations) : event.locations;
    event.users = req.body.users ? JSON.parse(req.body.users) : event.users;
    event.administrators = req.body.administrators ? JSON.parse(req.body.administrators) : event.administrators;

    if (creation) {
        event.save(req, function (error) {
            if (error) {
                return res.send(error);
            }
            res.json({location: '/api/events/' + event._id});
        });
    } else {
        event.update(req, function (error, numAffected) {
            if (error) {
                return res.send(error);
            }
            console.log('Update ' + numAffected + ' records.');
            res.json({location: '/api/events/' + event._id});
        });
    }
}

exports.postEvent = function (req, res) {
    var users = null;
    if (req.body.location) {
        var locationArray = JSON.parse(req.body.location);
        Location.find({_id: {$in: locationArray}}, function (error, locations) {
            if (error) {
                return res.send(error);
            }

            saveEvent(req, res, locations, users);
        });
    } else {
        saveEvent(req, res, null, users);
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

        saveEvent(req, res, event);
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

exports.addLocationToEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }
        Location.findOne({_id: req.params.lid}, function (error, location) {
            if (error) {
                return res.send(error);
            }
            if (!event.locations) {
                event.locations = [];
            }
            event.locations.push(location);
            event.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/events/' + event._id});
            });
        });
    });
};

exports.removeLocationFromEvent = function (req, res) {
    Event.findOne({_id: req.params.id}, function (error, event) {
        if (error) {
            return res.send(error);
        }
        Location.findOne({_id: req.params.lid}, function (error, location) {
            if (error) {
                return res.send(error);
            }

            event.locations.pull(location);
            event.save(req, function (error) {
                if (error) {
                    return res.send(error);
                }
                res.json({location: '/api/events/' + event._id});
            });
        });
    });
};