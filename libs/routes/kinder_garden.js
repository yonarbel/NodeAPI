var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var KinderGarden = require(libs + 'model/kinder_garden');

// List all articles
router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    KinderGarden.find(function (err, gardens) {
        if (!err) {
            return res.json(gardens);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

// Create article
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    var garden = new KinderGarden({
        name: req.body.name,
        owners: req.body.owners,
        description: req.body.description,
        logo: req.body.logo
    });

    garden.save(function (err) {
        if (!err) {
    
            log.info('New garden created with id: %s', garden.id);
            return res.json({
                status: 'OK',
                garden: garden
            });
        } else {
            log.error(err)
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});

// Get article
router.get('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {

    KinderGarden.findById(req.params.id, function (err, gaden) {

        if (!garden) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                article: article
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

// Update article
router.put('kinder_garden/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
    var gardenId = req.params.id;

    KinderGarden.findById(gardenId, function (err, garden) {
        if (!garden) {
            res.statusCode = 404;
            log.error('Garden with id: %s Not Found', gardenId);
            return res.json({
                error: 'Not found'
            });
        }

        article.title = req.body.title;
        article.description = req.body.description;
        article.author = req.body.author;
        article.images = req.body.images;

        article.save(function (err) {
            if (!err) {
                log.info('Article with id: %s updated', article.id);
                return res.json({
                    status: 'OK',
                    article: article
                });
            } else {
                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    return res.json({
                        error: 'Validation error'
                    });
                } else {
                    res.statusCode = 500;

                    return res.json({
                        error: 'Server error'
                    });
                }
                log.error('Internal error (%d): %s', res.statusCode, err.message);
            }
        });
    });
});

module.exports = router;
