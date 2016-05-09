"use strict";

var Activity = require('./activity');

exports.postActivity= function (req, res) {
    return res.json({message: 'Activity creation is currently disabled.'});
    // var activity = new Activity({
    //     name: req.body.name,
    //     avatar: req.body.avatar || null,
    //     description: req.body.description || null
    // });
    //
    // activity.save(req, function (error) {
    //     if (error) {
    //         return res.send(error);
    //     }
    //     res.json({location: '/api/activities/' + activity._id});
    // });
};


exports.getActivities = function (req, res) {
    Activity.find(function (error, activities) {
        if (error) {
            return res.send(error);
        }

        res.json(activities);
    });
};

exports.getActivity = function (req, res) {
    Activity.findOne({_id: req.params.id}, function (error, activity) {
        if (error) {
            return res.send(error);
        }
        res.json(activity);
    });
};

exports.putActivity = function (req, res) {
    Activity.findOne({_id: req.params.id}, function (error, activity) {
        if (error) {
            return res.send(error);
        }

        return res.json({message: 'Activity creation is currently disabled.'});
        // todo implement activity creationg
        // activity.name = req.body.name;
        // activity.avatar = req.body.avatar || null;
        // activity.description = req.body.description || null;
        // activity.save(req, function (error) {
        //     if (error) {
        //         return res.send(error);
        //     }
        //     res.json({location: '/api/activities/' + activity._id});
        // });
    });
};

exports.deleteActivity = function (req, res) {
    Activity.remove({_id: req.param.id}, function (error) {
        if (error) {
            res.send(error);
        } else {
            res.send({message: 'deleted'});
        }
    });
};