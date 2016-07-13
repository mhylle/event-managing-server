"use strict";

var Authorization = require('./authorization');
var groupController = require('../../groups/group.controller');
var Group = require('../../groups/group');

exports.postAuthorization = function (req, res) {
    var authorization = new Authorization({
        name: req.body.name,
    });
    authorization.save(req, function (error) {
        if (error) {
            return res.send(error);
        }
        res.json({location: '/api/authorizations/' + authorization._id});
    });
};

exports.getAuthorizations = function (req, res) {
    Authorization.find(function (error, authorizations) {
        if (error) {
            return res.send(error);
        }

        res.json(authorizations);
    });
};

exports.getAuthorization = function (req, res) {
    Authorization.findOne({_id: req.params.id}, function (error, authorization) {
        if (error) {
            return res.send(error);
        }
        res.json(authorization);
    });
};

exports.putAuthorization = function (req, res) {
    Authorization.findOne({_id: req.params.id}, function (error, authorization) {
        if (error) {
            return res.send(error);
        }

        authorization.name = req.body.name;

        authorization.save(req, function (error) {
            if (error) {
                return res.send(error);
            }
            res.json({location: '/api/authorizations/' + authorization._id});
        });
    });
};

exports.deleteAuthorizationById = function (req, res) {
    Authorization.findOne(req.param._id, function (error, authorization) {
        if (error) {
            res.send(error);
        } else {
            authorization.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });

        }
    });
};

exports.deleteAuthorizationByName = function (req, res) {
    Authorization.findOne(req.body.name, function (error, authorization) {
        if (error) {
            res.send(error);
        } else {
            authorization.remove(function (error) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({message: 'deleted'});
                }
            });

        }
    });
};

exports.hasAutorization = function (action, operation, user) {
    // get user group
    // is the group part of the action
    // if not, return false
    // if yes, does the group have access to the operation
    // if yes, return yes
    // else return false
    User.findOne({_id: user._id})
        .populate('groups')
        .exec(function (error, user) {
            if (error) {
                console.log('Error while populating groups in the user');
            }
            
        });

};