/**
 * Created by mah on 12-04-2016.
 */
var config = require('../config.json');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../users/user');
var Client = require('./client');
var AccessToken = require('./accesstoken');
var RefreshToken = require('./refreshtoken');

passport.use(new BasicStrategy(
    function (username, password, done) {
        Client.findOne({clientId: username}, function (error, client) {
            if (error) {
                return done(error);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != password) {
                return done(null, false);
            }
            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
        Client.findOne({clientId: clientId}, function (error, client) {
            if (error) {
                return done(error);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != clientSecret) {
                return done(null, false);
            }

            return done(null, client);
        })
    }
));

passport.use(new BearerStrategy(
    function (accessToken, done) {
        AccessToken.findOne({token: accessToken}, function (error, token) {
            if (error) {
                return done(error);
            }
            if (!token) {
                return done(null, false);
            }

            if (Math.round(Date.now() - token.created / 1000) > config.get('security:tokenLife')) {
                AccessToken.remove({token: accessToken}, function (error) {
                    if (error) {
                        return done(error);
                    }
                });
                return done(null, false, {message: 'Token expired'});
            }
            User.findById(token.userId, function (error, user) {
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }
                var info = {scope: '*'};
                done(null, user, info);
            })
        })
    }
))