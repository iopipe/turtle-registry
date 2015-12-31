var config = require('./config')
var jwt = require('express-jwt');

exports.init = function(app) {
  var authenticate = jwt({
    secret: new Buffer(config.jwt_key, 'base64'),
    audience: config.jwt_audience
  });
  app.use("/v0/filters/", authenticate);
}
