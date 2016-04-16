"use strict";

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var EventSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    avatar: {type: String},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    signstart: {type: Date},
    signend: {type: Date},
    canceldeadline: {type: Date},
    description: {type: String},
    memberprice: {type: Number},
    nonmemberprice: {type: Number},
    defaultprice: {type: Number},
    location: [{type: ObjectId, ref: 'Location'}],
    users: [{type: ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Event', EventSchema);