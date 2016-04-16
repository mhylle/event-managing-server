"use strict";

var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    avatar: {type: String},
    description: {type: String}
});


module.exports = mongoose.model('Location', LocationSchema);