'use strict'

var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var sampleTable = require('../sample/sample_table')
var sampleMapperConfig = require('../sample/sample_config')

var tableModule = require('../../lib/table')
var templateModule = require('../../lib/template')
var Table = tableModule.Table

describe('#template module', function () {
  var tableName = 'sample'
  var targetTable = Table.factory(tableName, sampleTable.TABLE_ROWS)
  var tplObj = templateModule.buildTemplate(sampleMapperConfig, targetTable)

  describe('#build Template class', function () {
    it('Template came from table', function () {
      expect(tableName).to.be.equal(tplObj.tableName)
      expect(sampleMapperConfig.modal.package).to.be.equal(tplObj.modalPackage)
      expect(sampleMapperConfig.mapper.package).to.be.equal(tplObj.mapperPackage)

      expect(tplObj.columns).to.have.lengthOf(targetTable.fields.length)

      assert.isAtLeast(tplObj.packages.length, 2)
    })
  })

  describe('#render templates', function () {
    it('will render proper template', function () {
      var modalContent = templateModule.render(tplObj, templateModule.RENDER_TYPES.modal)
      expect(modalContent).to.have.string('public class ' + tplObj.baseClassName + 'VO')

      for(var i in tplObj.columns){
        var item = tplObj.columns[i]
        expect(modalContent).to.have.string('private ' + item.targetType + ' ' + item.lowerCamelField)
        expect(modalContent).to.have.string('void set' + item.upperCamelField)
        expect(modalContent).to.have.string(item.targetType + ' get' + item.upperCamelField)
      }
    })
  })
})
