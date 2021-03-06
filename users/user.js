/* jshint node: true */

"use strict";
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.ObjectId;
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
    groups: [{type: ObjectId, ref: 'Group'}],
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = function (password) {
    var cipher = crypto.createCipher('aes-256-cbc', this.salt);
    cipher.update(password, 'utf8', 'base64');

    return  cipher.final('base64');
    // return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('userId')
    .get(function () {
        return this.id;
    });

UserSchema.virtual('password')
    .set(function (password) {
        this.plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        this.hash = this.encryptPassword(password);
    })
    .get(function () {
        return this.plainPassword;
    });

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hash;
};

module.exports = mongoose.model('User', UserSchema);