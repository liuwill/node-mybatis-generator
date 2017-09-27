'use strict'

var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var sampleTable = require('../sample/sample_table')

var tableModule = require('../../lib/table')
var Column = tableModule.Column
var Table = tableModule.Table

describe('#table module', function () {
  describe('#Column class feature', function () {
    it('column created by factory', function () {
      var simpleColData = { "Field": "id", "Type": "int(11) unsigned", "Null": "NO", "Key": "PRI", "Default": "NULL", "Extra": "auto_increment" }
      var testCol = Column.factory(simpleColData['Field'], simpleColData['Type'])

      expect(testCol).to.include({targetType: 'Integer', field: 'id'})
    })
  })

  describe('#Table class feature', function () {
    it('Table is exist', function () {
      var targetTable = Table.factory('sample', sampleTable.TABLE_ROWS)

      expect(targetTable.fields).to.have.lengthOf(sampleTable.TABLE_ROWS.length)
      for(var i in sampleTable.TABLE_ROWS){
        var rowData = sampleTable.TABLE_ROWS[i]
        assert.isNotNull(targetTable[rowData.Field])

        var tableCol = targetTable[rowData.Field]
        assert.isNotNull(tableModule.GENERATOR_RULE[tableCol.targetType])
      }
    })
  })
})
