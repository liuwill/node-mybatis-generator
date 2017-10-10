'use strict'

var fs = require('fs')
var path = require('path')
var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var loader = require('../../lib/loader')

describe('#file loader', function () {
  var randPath = Math.random().toString(36).substr(2, 9)

  describe('#load Json', function () {
    it('will throw error when file not exists', function () {
      expect(function () { loader.loadJson(path.join(__filename, randPath + '_path')) }).to.throw()
      expect(function () { loader.loadJson(__dirname) }).to.throw()
      expect(function () { loader.loadJson(__filename) }).to.throw()
    })

    it('will load json content from file', function () {
      var jsonData = {
        'host': 'localhost',
        'user': 'root',
        'password': '123456',
        'database': 'demo',
        'port': 3306
      }

      var fileName = 'json_' + randPath
      var writePath = path.join(__dirname, fileName)
      fs.writeFileSync(writePath, JSON.stringify(jsonData))

      var readData = loader.loadJson(writePath)
      expect(readData).to.deep.equal(jsonData)

      fs.unlinkSync(writePath)
    })
  })

  describe('#init target', function () {
    it('will throw error where directory not exists', function () {
      expect(function () { loader.initTarget(path.join(__filename, './' + randPath + '/path')) }).to.throw()
    })

    it('will throw error when directory is not empty', function () {
      expect(function () { loader.initTarget('./') }).to.throw()
    })

    it('will throw error when file passed', function () {
      expect(function () { loader.initTarget(__filename) }).to.throw()
      expect(function () { loader.initTarget(path.join(__filename, './path')) }).to.throw()
    })

    it('will create directory', function () {
      var filePath = './temp_' + randPath
      assert.isFalse(fs.existsSync(filePath))

      loader.initTarget(filePath)

      assert.isTrue(fs.existsSync(filePath))
      expect(function () { loader.initTarget(filePath) }).to.not.throw()
      fs.rmdirSync(filePath)
    })
  })
})
