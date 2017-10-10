'use strict'

/**
 * 连接数据库，查询数据
 */

var bluebird = require('bluebird')
var mysql = require('mysql')

function Connection(config) {
  this.config = config

  this.connection = mysql.createConnection(config)
  this.connection.connect()
}

Connection.prototype.query = function (queryStr) {
  var that = this
  return new bluebird(function (resolve, reject) {
    that.connection.query(queryStr, function (error, results, fields) {
      if (error) {
        reject(error)
      } else {
        resolve(results, fields)
      }
    })
  })
}

module.exports = {
  Connection: Connection,
  createConnection: function (dbConfig) {
    return new Connection(dbConfig)
  }
}
