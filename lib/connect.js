var bluebird = require('bluebird')
var mysql = require('mysql')
var Pool = require("mysql/lib/Pool")
var Connection = require("mysql/lib/Connection")
bluebird.promisifyAll(mysql)
bluebird.promisifyAll([Pool, Connection])

var pool = null
function getSqlConnection(config) {
  if (!pool){
    pool = mysql.createPool(config.mysql)
  }

  return pool.getConnectionAsync().disposer(function (connection) {
    connection.release()
  })
}

module.exports = getSqlConnection
