"use strict";

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var LocationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    avatar: {type: String},
    description: {type: String},
    authorizations: [{type: ObjectId, ref: 'Authorization'}],
});


module.exports = mongoose.model('Location', LocationSchema);