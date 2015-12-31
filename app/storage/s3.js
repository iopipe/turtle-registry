var AWS = require('aws-sdk')
var config = require('../config')
var crypto = require('crypto')

var s3bucket = new AWS.S3({params: {Bucket: config['storage']['s3']['bucket']}});

function putBucket(id, data, callback) {
  var params = {Bucket: config['storage']['s3']['bucket'], Key: id, Body: data};
  s3bucket.putObject(params, function(err, data) {
    if (err) {
      callback(500)
      //throw "Error uploading data: " + err
    } else {
      console.log("Successfully uploaded data to ", config['storage']['s3']['bucket'], "/", id)
      callback(id)
    }
  })
}

exports.get_filter = function (req, res) {
  var id = req.params.id
  var params = {Bucket: config['storage']['s3']['bucket'], Key: id, Expires: 60};
  /*s3bucket.getObject(params, function(err, data) {
    if (err || data === null || data.Body === null) {
      res.send(404)
      return
    }
    console.log(data)
    res.send('{ "data": "'+data.Body+'" }')
  })*/
  var url = s3bucket.getSignedUrl('getObject', params, function(err, url) {
    if (err || url === undefined || url === null) {
      res.send(404)
      return
    }
    console.log(url)
    res.redirect(url)
  })
}

exports.put_filter = function (id, data, done) {
  var fromObjType = "Object"
  var toObjType = "Object"
  var name = fromObjType + "->" + toObjType
  s3bucket.createBucket(function() {
    putBucket(id, data, function() {
      var config = {
        id: id,
        name: id,
        fromObjType: fromObjType,
        toObjType: toObjType
      }
      done(config)
    })
  })
}

exports.init = function() {
  /* Init */
  AWS.config.region = config['storage']['s3']['region']
  AWS.config.update({accessKeyId: config['storage']['s3']['access_key'],
                     secretAccessKey: config['storage']['s3']['secret_key']})
}
