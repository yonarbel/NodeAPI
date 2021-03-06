var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);
var User = require(libs + 'model/user');
var db = require(libs + 'db/mongoose');

router.get('/info', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`. It is typically used to indicate scope of the token,
        // and used in access control checks. For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope,
            roles:['admin']
        });
    }
);

router.post('/', passport.authenticate('bearer', { session: false }),
    function (req, res) {

        log.info('Starting proccess of saving new user - %s:%s', req.body.username, req.body.password);
            var user = new User({
                username: req.body.username,
                password: req.body.password
            });
        
            user.save(function (err, user) {
                if (!err) {
                    log.info('New user - %s:%s', user.username, user.password);

                    return res.json({
                        status: 'OK',
                        user: user
                    });

                } else {
                    return log.error(err);
                }
            });
     
    }
);

module.exports = router;
