var extend = require('extend')
var local_config = require('../etc/config.json')
var config = require('../etc/default-config.json')
extend(true, config, local_config)
module.exports = config
