var config = require('./config')

var acorn = require('acorn')
var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');

/* Routers */
var auth = require('./auth')
var indexSvc = require('./store')
var searchSvc = require('./search')
var userSvc = require('./users')

var app = express();
module.exports = app

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({
  secret: config.session.secret
}))
app.use(bodyParser.text({
  type: "application/javascript"
  ,verify: verifyJavascript
}));
app.use(bodyParser.json());

/* Load routes */
auth.init(app)
indexSvc.init(app)
searchSvc.init(app)
userSvc.init(app)

var server = app.listen(config.listen_port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('iopipe-index listening at http://%s:%s', host, port);
});

function verifyJavascript(req, res, buf, encoding) {
  /* Only allow valid syntax trees to be uploaded & stored. */
  try {
    acorn.parse(buf.toString(), { sourceType: "module" })
  }
  catch(err) {
    throw err
  }
}
