var config = require('../config')
var fs = require('fs')
var os = require('os')
var crypto = require('crypto')
var path = require('path')

var ROOTPATH = path.join(os.homedir(), ".iopipe", "filter_cache")

function get_path (id) {
  /* Input should be validated before-hand...
     generally this id should be a locally-generated sha256,
     and thus traversal should not be a security risk.
     Do not pass unvalidated user input to this function. */
  return path.normalize(path.join(ROOTPATH, id))
}

exports.get_filter = function (req, res) {
  var id = req.params.id
  var path = get_path(id)
  fs.readFile(path, function(err, data) {
    if (err) {
      res.send(404)
    }
    res.send(data)
  })
}

exports.put_filter = function (req, res) {
   var data = req.body
   var hash = crypto.createHash('sha256')
   hash.update(data) 
   var id = hash.digest('hex')
   var path = get_path(id)
   fs.writeFile(path, data, res.send.bind(undefined, id))
}

exports.init = function() {
  /* Init */
  try {
    fs.mkdirSync(os.homedir())
    fs.mkdirSync(os.homedir(), ".iopipe")
    fs.mkdirSync(ROOTPATH)
  }
  catch (e) { return }
}
