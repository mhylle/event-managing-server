var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;

var AuthorizationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    group: {type: ObjectId, ref: 'Group'},
    type: [{type: String}]
});

module.exports = mongoose.model('Authorization', AuthorizationSchema);