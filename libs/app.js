var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

var libs = process.cwd() + '/libs/';

require(libs + 'auth/auth');

var config = require('./config');
var log = require('./log')(module);
var oauth2 = require('./auth/oauth2');
var static_folder = process.cwd() + '/ui/dist/static';
var api = require('./routes/api');
var users = require('./routes/users');
var articles = require('./routes/articles');
var kinder_gardens = require('./routes/kinder_garden');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/static', express.static(static_folder))
app.use('/', api);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/kinder_gardens', kinder_gardens);
app.use('/api/oauth/token', oauth2.token);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
    return;
});

// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
    return;
});
console.log("STATIC FOLDER",static_folder)

//app.use(express.static(static_folder))

module.exports = app;
