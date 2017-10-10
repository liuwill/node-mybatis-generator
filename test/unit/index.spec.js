'use strict'

var chai = require('chai')
var sinon = require('sinon')

var bluebird = require('bluebird')
var path = require('path')
var rimraf = require('rimraf')

chai.should()
var assert = chai.assert

var sampleTable = require('../sample/sample_table')
var sampleConfig = require('../sample/sample_config')
var connectModel = require('../../lib/connect')
var loader = require('../../lib/loader')

describe('#mybatis generator', function () {
  before(function () {
    mockDb()
  })

  function mockDb() {
    var queryFunc = function (str) {
      var queryData = {}
      if (str.indexOf('desc') != -1) {
        queryData = sampleTable.TABLE_ROWS
      } else if (str.indexOf('show tables') != -1) {
        queryData = sampleTable.TABLE_NAMES
      }

      return new bluebird(function (resolve, reject) {
        if (str === 'show tables error') {
          reject(new Error())
        } else {
          resolve(queryData)
        }
      })
    }

    sinon.stub(connectModel, 'createConnection').callsFake(function () {
      return {
        query: queryFunc
      }
    })

    sinon.stub(loader, 'loadMapperConfig').callsFake(function () {
      return sampleConfig
    })
    sinon.stub(loader, 'loadDbConfig').callsFake(function (filePath) {
      return {
        'database': filePath === 'error' ? 'error' : 'simple'
      }
    })
  }

  describe('#generator feature', function () {
    var mybatisGenerator = require('../../')

    it('will works', function (done) {
      var randPath = Math.random().toString(36).substr(2, 9)
      var basePath = path.join(__dirname, randPath)
      mybatisGenerator({
        mapperPath: '',
        databasePath: '',
        outputPath: basePath
      }, function (err) {
        assert.isNull(err)
        rimraf(basePath, function(){
          done()
        })
      })
    })

    it('will throw error', function (done) {
      var randPath = Math.random().toString(36).substr(2, 9)
      var basePath = path.join(__dirname, randPath)
      mybatisGenerator({
        mapperPath: '',
        databasePath: 'error',
        outputPath: basePath
      }, function (err) {
        assert.isNotNull(err)
        rimraf(basePath, function(){
          done()
        })
      })
    })
  })
})
