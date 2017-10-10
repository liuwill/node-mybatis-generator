'use strict'

var fs = require('fs')
var path = require('path')
var chai = require('chai')
var rimraf = require('rimraf')

chai.should()
var expect = chai.expect
var assert = chai.assert

var generator = require('../../lib/generator')

describe('#save generated file', function () {
  var randPath = Math.random().toString(36).substr(2, 9)

  describe('#load Json', function () {
    it('will load json content from file', function (done) {
      var jsonData = {
        'mapper': {
          'package': 'com.liuwill.demo.generator.mapper',
          'type': 'java'
        },
        'xml': {
          'package': 'mapper',
          'type': 'resources'
        },
        'modal': {
          'package': 'com.liuwill.demo.generator.modal',
          'type': 'java'
        }
      }

      var fileName = 'Mapper.java'
      var fileContent = 'hello'
      var basePath = path.join(__dirname, randPath)

      fs.mkdirSync(basePath)
      var writePath = generator.buildSavePath(basePath, jsonData.mapper.package, fileName)

      expect(writePath).to.have.string(jsonData.mapper.package.replace(/\./g, '/'))

      generator.writerFile(basePath, jsonData.mapper.package, fileName, '')
      assert.isFalse(fs.existsSync(writePath))

      fs.mkdirSync(path.join(basePath, 'com'))
      generator.writerFile(basePath, jsonData.mapper.package, fileName, fileContent)
      assert.isTrue(fs.existsSync(writePath))

      var writeContent = fs.readFileSync(writePath)
      expect(writeContent.toString()).to.be.equal(fileContent)

      rimraf(basePath, function () {
        done()
      })
    })
  })
})
