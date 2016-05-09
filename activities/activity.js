"use strict";

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var ActivitySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    avatar: {type: String},
    description: {type: String},
    minimumAttendants: {type: Number},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    memberprice: {type: Number},
    nonmemberprice: {type: Number},
    defaultprice: {type: Number},
    location: [{type: ObjectId, ref: 'Location'}],
    users: [{type: ObjectId, ref: 'User'}],
    responsible: [{type: ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Activity', ActivitySchema);