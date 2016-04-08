/**
 * Created by mah on 05-04-2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    hash: {type: String},
    firstname: {type: String, required: true},
    middlename: {type: String},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    birthday: {type: Date},
    avatar: {type: String},
    groups: {type: Array}
});

UserSchema.pre('save', function (next, req, callback) {
    var user = this;
    var password = req.body.password;
    bcrypt.hash(password, 8, function (error, hash) {
        if (error) {
            return callback(error);
        }

        user.hash = hash;
        next(callback);
    });
});

UserSchema.methods.verifyPassword = function (password, callback) {
    var user = this;
    var userhash = user.hash;

    if (userhash === undefined) {
        return callback('no userhash, something is wrong');
    }

    bcrypt.compare(password, userhash, function (error, result) {
        if (error) {
            callback(null, false);
        } else {
            callback(null, result);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);