var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var GroupSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    type: {type: String, required: true},
    avatar: {type: String},
    users: [{type: ObjectId, ref: 'User'}],
    events: [{type: ObjectId, ref: 'Event'}],
    administrators: [{type: ObjectId, ref: 'User'}],
    authorizations: [{type: ObjectId, ref: 'Authorizations'}]
});


module.exports = mongoose.model('Group', GroupSchema);