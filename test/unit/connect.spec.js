'use strict'

var chai = require('chai')
var sinon = require('sinon')

var mysql = require('mysql')

chai.should()
var expect = chai.expect

var connectModal = require('../../lib/connect')

describe('#connect module', function () {
  var mockCount = 0

  before(function () {
    var queryFunc = function (str, callback) {
      if (str === 'error') {
        callback(new Error())
      } else {
        callback(null, [], [])
      }
    }

    sinon.stub(mysql, 'createConnection').callsFake(function (config) {
      return {
        connect: function () {
          mockCount++

          return config
        },
        query: queryFunc
      }
    })
  })

  describe('#connect class feature', function () {
    it('will connect with mysql', function (done) {
      var conn = new connectModal.Connection({})
      expect(mockCount).to.be.at.least(1)

      conn.query('error').catch(function (error) {
        expect(error).to.be.a('Error')
        done()
      })
    })

    it('will trigger query resolve', function (done) {
      var conn = connectModal.createConnection({})
      expect(mockCount).to.be.at.least(1)

      conn.query('desc').then(function (results) {
        expect(results).to.be.a('Array')
        done()
      })
    })
  })
})
