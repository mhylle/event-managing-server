/**
 * Created by mah on 11-04-2016.
 */
var passport = require('passport');

exports.login = function (req, res, next) {
    var callback = req.query.callback || '/profile';
    passport.authenticate('local', function (error, user, info) {
        if (error || !user) {
            res.send('unable to login');
        }

        req.logIn(user, function (error) {
            if (error) {
                return next(error);
            }

            return res.redirect(callback);
        });
    })(req, res, next);
};