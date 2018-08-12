var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Logo = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

var KinderGarden = new Schema({
    name: { type: String, required: true },
    owners: { type: String, required: true },
    description: { type: String, required: true },
    Address: { type: String, required: false },
    logo: [Logo],
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('kinder_garden', KinderGarden);
