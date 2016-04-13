/**
 * Created by mah on 05-04-2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
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
    groups: {type: Array},
    created: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.pre('save', function (next, req, callback) {
//     var user = this;
//     var password = req.body.password;
//     bcrypt.hash(password, 8, function (error, hash) {
//         if (error) {
//             return callback(error);
//         }
//
//         user.hash = hash;
//         next(callback);
//     });
// });

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('userId')
    .get(function () {
        return this.id;
    });

UserSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        this.hash = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hash;
};

// UserSchema.methods.verifyPassword = function (password, callback) {
//     var user = this;
//     var userhash = user.hash;
//
//     if (userhash === undefined) {
//         return callback('no userhash, something is wrong');
//     }
//
//     bcrypt.compare(password, userhash, function (error, result) {
//         if (error) {
//             callback(null, false);
//         } else {
//             callback(null, result);
//         }
//     });
// };

module.exports = mongoose.model('User', UserSchema);