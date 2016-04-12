/**
 * Created by mhylle on 12-04-2016.
 */
var log = require('./libs/log')(module);

var mongoose = require('mongoose');
var User = require('./users/user');
var Client = require('./security/client');
var AccessToken = require('./security/accesstoken');
var RefreshToken = require('./security/refreshtoken');
var faker = require('faker');

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
Client.remove({}, function (error) {
    var client = new ClientModel({name: "OurService iOS client v1", clientId: "mobileV1", clientSecret: "abc123456"});
    client.save(function (error, client) {
        if (error) {
            return log.error(error);
        } else {
            log.info("New client - %s:%s", client.clientId, client.clientSecret);
        }
    });
});

AccessToken.remove({}, function (err) {
    if (err) {
        return log.error(err);
    }
});
RefreshToken.remove({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

setTimeout(function () {
    mongoose.disconnect();
}, 3000);