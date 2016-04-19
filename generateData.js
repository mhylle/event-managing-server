var mongoose = require('mongoose');
var User = require('./users/user');
var UserController = require('./users/user.controller');
var Group = require('./groups/group');
var Location = require('./locations/location');
var Event = require('./events/event');

var faker = require('faker');

exports.createSuperUsers = function() {
    req = {
        body: {
            username: 'mhylle',
            firstname: 'Martin',
            lastname: 'Hylleberg',
            email: 'mhylle@gmail.com',
            phone: 61791394,
            birthday: new Date()
        }
    }
    UserController.postUser(req);
};


User.remove({}, function (error) {
    var user = new User({username: "andrey", password: "simplepassword"});
    user.save(function (error, user) {
        if (error) {
            return log.error(error);
        } else {
            log.info("New user %s:%s", user.username, user.password);
        }
    })

    for (i = 0; i < 4; i++) {
        var user = new User({username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0]});
        user.save(function (err, user) {
                if (err) {
                    return log.error(err);
                } else {
                    log.info("New user - %s:%s", user.username, user.password);
                }
            }
        );
    }
});

setTimeout(function () {
    mongoose.disconnect();
}, 3000);