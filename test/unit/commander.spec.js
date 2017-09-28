'use strict'

var chai = require('chai')
var sinon = require('sinon')

var yargs = require('yargs')

chai.should()
var expect = chai.expect

var MOCK_CONFIG = {
  output: 'output',
  database: 'database',
  config: 'config'
}

describe('#commander module', function () {
  before(function () {
    function YargsCls() {
      this.argv = MOCK_CONFIG
    }
    YargsCls.prototype.help = function () { return this }
    YargsCls.prototype.option = function () { return this }
    YargsCls.prototype.usage = function () { return this }
    var yargsObj = new YargsCls()

    sinon.stub(yargs, 'help').returns(yargsObj.help())
    sinon.stub(yargs, 'usage').returns(yargsObj.usage())
    sinon.stub(yargs, 'option').returns(yargsObj.option())
  })

  describe('#commander feature', function () {
    it('will connect with mysql', function () {
      var commanderModule = require('../../lib/commander')
      var commandConfig = commanderModule.getCommandConfig()
      var commander = commanderModule.commander

      for(var key in commander.argv){
        expect(commander.argv[key]).to.be.equal(key)
      }

      expect(commandConfig.outputPath).to.be.equal('output')
    })
  })
})
