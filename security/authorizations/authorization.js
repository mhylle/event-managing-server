var mongoose = require('mongoose');

var AuthorizationSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Authorization', AuthorizationSchema);