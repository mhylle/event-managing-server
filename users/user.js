/**
 * Created by mah on 05-04-2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    hash: {type: String},
    salt: {type: String},
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

    bcrypt.genSalt(36, function (error, salt) {
        if (error) {
            return callback(error);
        }

        var password = req.body.password;
        bcrypt.hash(password, salt, null, function (error, hash) {
            if (error) {
                return callback(error);
            }

            user.hash = hash;
            user.salt = salt;
            next(callback);
        });
    });

    // callback();
    // todo ensure any stuff that needs to be done before a save is done here..
});

UserSchema.methods.verifyPassword = function (password, callback) {
    var user = this;
    var userhash = user.hash;
    var salt = user.salt;

    if (userhash === undefined) {
        return callback('no userhash, something is wrong');
    }

    bcrypt.hash(password, salt, null, function (error, hash) {
        if (error) {
            return callback(null, false);
        }
        console.log('hash:    ' + hash);
        console.log('userhash ' + userhash);
        console.log('should they be the same? ' + hash === userhash);
        bcrypt.compare(hash, userhash, function (error, result) {
            if (error) {
                callback(null, false);
            } else {
                callback(null, result);
            }
        });

    });
    // var compareSync = bcrypt.compareSync(hash, userhash);
    // callback(null, compareSync);
};

module.exports = mongoose.model('User', UserSchema);