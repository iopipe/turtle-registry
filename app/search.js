var config = require('./config')

var metastore = require(config['metastore'])

exports.init = function(router) {
  metastore.init()

  router.get('/v0/filters', metastore.list_all_transforms)
  router.get('/v0/discover/:from/:to', metastore.find_path)
  router.get('/v0/discover/:query', metastore.find_all_obj_transforms)
  router.get('/v0/count', metastore.count_all_transforms)
}
