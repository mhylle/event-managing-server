var mongoose = require('mongoose');

var ModuleSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    operations: [{type: String}]
});

module.exports = mongoose.model('Module', ModuleSchema);