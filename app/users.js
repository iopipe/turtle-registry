var config = require('./config')

var metastore = require(config['metastore'])

exports.init = function(router) {
  metastore.init()

  router.get('/v0/users/:uid', metastore.get_user_by_id)
  router.get('/v0/users', metastore.search_users_by_name)
}
