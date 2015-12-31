var legerdemain = require('legerdemain');
var app = require('./express.js');
exports.handlers = legerdemain.bind(app)
