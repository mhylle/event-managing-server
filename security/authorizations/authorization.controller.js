"use strict";

var Authorization = require('./authorization');

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