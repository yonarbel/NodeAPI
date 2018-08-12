var express = require('express');
var passport = require('passport');
var router = express.Router();
var dist = process.cwd() + '/ui/dist';
router.get('/api/', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.json({
        msg: 'API is running'
    });
});
router.get('/web/', function(req, res){
   res.sendFile('index.html', { root: dist } );
});

module.exports = router;
