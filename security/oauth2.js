/**
 * Created by mah on 12-04-2016.
 */
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var config = require('../config.json');
var User = require('../users/user');
var Client = require('./client');
var AccessToken = require('./accesstoken');
var RefreshToken = require('./refreshtoken');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    User.findOne({username: username}, function (error, user) {
        if (error) {
            return done(error);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.checkPassword(password)) {
            return done(null, false);
        }
        RefreshToken.remove({userId: user.userId, clientId: client.clientId}, function (error) {
            if (error) {
                return done(error);
            }
        });

        AccessToken.remove({userId: user.userId, clientId: client.clientId}, function (error) {
            if (error) {
                return done(error);
            }
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessToken({token: tokenValue, clientId: client.clientId, userId: user.userId});
        var refreshToken = new RefreshToken({token: refreshTokenValue, clientId: client.clientId, userId: user.userId});
        refreshToken.save(function (error) {
            if (error) {
                return done(error);
            }
        });

        var info = {scope: '*'};
        token.save(function (error, token) {
            if (error) {
                return done(error);
            }
            done(null, tokenValue, refreshTokenValue, {'expires_in': config.get('security:tokenLife')});
        });
    });
}));

server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    RefreshToken.findOne({token: refreshToken}, function (error, token) {
        if (error) {
            return done(error);
        }
        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function (error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false);
            }
            RefreshToken.remove({userId: user.userId, clientId: client.clientId}, function (error) {
                if (error) {
                    return done(error);
                }
            });

            AccessToken.remove({userId: user.uderId, clientId: client.clientId}, function (error) {
                if (error) {
                    return done(error);
                }
            });

            var tokenValue = crypto.randomBytes(32).toString('hex');
            var refreshTokenValue = crypto.randomBytes(32).toString('hex');
            var token = new AccessToken({token: tokenValue, clientId: client.clientId, userId: user.userId});
            var refreshToken = new RefreshTokenModel({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId
            });

            refreshToken.save(function (error) {
                if (error) {
                    return done(error);
                }
            });
            var info = {scope: '*'}
            token.save(function (error, token) {
                if (error) {
                    return done(error);
                }
                done(null, tokenValue, refreshTokenValue, {expires_in: config.get('security:tokenLife')});
            });
        });
    })
}));

exports.token = [passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()];

