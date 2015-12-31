var acorn = require('acorn')
var crypto = require('crypto')

var config = require('./config')
var filestore = require(config['filestore'])
var metastore = require(config['metastore'])


exports.init = function(router) {
  filestore.init()

  router.get('/v0/filters/:id', filestore.get_filter)

  router.put('/v0/filters/', put_filter)
  router.post('/v0/filters/', put_filter)
  //router.put('/filters/', metastore.put_filter)
  //router.post('/filters/', metastore.put_filter)
  //router.get('/pipelines/:name', get_pipe)
}

function put_filter(req, res) {
  var data = req.body
  var hash = crypto.createHash('sha256')
  hash.update(data)
  var id = hash.digest('hex')

  callback = function(config) {
    metastore.create_relationship(config, function() {
      console.log("Sending back config: " + config)
      res.send(config)
    })
  }
  filestore.put_filter(id, data, callback)
}
