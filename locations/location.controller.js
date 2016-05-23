"use strict";

var Location = require('./location');

exports.postLocation = function (req, res) {

    var location = new Location({
        name: req.body.name,
        avatar: req.body.avatar || null,
        description: req.body.description || null,
        authorizedGroups: req.body.authorizedGroups
    });

    location.save(req, function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/locations/' + location._id});
    });
};


exports.getLocations = function (req, res) {
    Location.find(function (error, locations) {
        if (error) {
            return res.send(error);
        }

        res.json(locations);
    });
};

exports.getLocation = function (req, res) {
    Location.findOne({_id: req.params.id}, function (error, location) {
        if (error) {
            return res.send(error);
        }
        res.json(location);
    });
};

exports.putLocation = function (req, res) {
    Location.findOne({_id: req.params.id}, function (error, location) {
        if (error) {
            return res.send(error);
        }

        location.name = req.body.name;
        location.avatar = req.body.avatar || null;
        location.description = req.body.description || null;

        location.save(req, function (error) {
            if (error) {
                return res.send(error);
            }
            res.json({location: '/api/locations/' + location._id});
        });
    });
};

exports.deleteLocation = function (req, res) {
    Location.remove({_id: req.param.id}, function (error) {
        if (error) {
            res.send(error);
        } else {
            res.send({message: 'deleted'});
        }
    });
};