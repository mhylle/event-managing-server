/**
 * Created by mah on 05-04-2016.
 */
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var EventSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    avatar: {type: String},
    users: [{type: ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Event', EventSchema);