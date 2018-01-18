'use strict'

/**
 * 处理数据库结构与生成代码的类型和结构映射
 */

var GENERATOR_RULE = {
  'VARCHAR': { 'targetType': 'String' },
  'TEXT': { 'targetType': 'String' },
  'TINYTEXT': { 'targetType': 'String' },
  'LONGTEXT': { 'targetType': 'String' },
  'INTEGER': { 'targetType': 'Integer' },
  'INT': { 'targetType': 'Integer' },
  'TINYINT': { 'targetType': 'Integer' },
  'TINY': { 'targetType': 'Integer' },
  'FLOAT': { 'targetType': 'Float' },
  'REAL': { 'targetType': 'Double' },
  'DOUBLE': { 'targetType': 'Double' },
  'DECIMAL': { 'targetType': 'BigDecimal' },
  'DATETIME': { 'targetType': 'Date' },
  'Date': { 'targetType': 'Date' }
}

var LENGTH_TYPES = ['VARCHAR', 'DECIMAL']

exports.GENERATOR_RULE = GENERATOR_RULE

function Table(tableName) {
  this.tableName = tableName
  this.fields = []
  this.data = {}

  this.addCol = function (field, fieldData) {
    var config = Column.factory(field, fieldData)

    this.data[field] = config
    this.fields.push(field)

    // eslint-disable-next-line
    // TODO this place closure may course some problem
    Object.defineProperty(this, field, {
      get: function () {
        return this.data[field]
      },
      set: function (val) {
        this.data[field] = val
      }
    })
  }
}

Table.factory = function (tableName, tableDatas) {
  var dbTable = new Table(tableName)

  for (var i in tableDatas) {
    var tableData = tableDatas[i]
    var type = tableData['Type']
    var field = tableData['Field']

    var nullMark = tableData['Null'] === 'YES'
    var defaultValue = ''
    if (tableData['Default']){
      defaultValue = tableData['Default']
    }

    dbTable.addCol(field, {
      type,
      nullMark,
      defaultValue,
    })
    //console.log(tableData['Type']+':'+tableData['Field'])
  }
  return dbTable
}

function Column(data) {
  this.rawType = data.rawType
  this.targetType = data.targetType
  this.field = data.field
  this.comment = data.comment

  this.typeLength = data.typeLength
  this.nullMark = data.nullMark
  this.defaultValue = data.defaultValue
  this.simpleMark = data.simpleMark
  this.hiddenMark = data.hiddenMark
}

Column.factory = function (field, fieldData) {
  const type = fieldData.type

  var bracePos = type.indexOf('(')
  var rawType = type.toUpperCase()
  var targetType = ''
  var typeLength = ''

  if (bracePos < 0) {
    targetType = GENERATOR_RULE[rawType]['targetType']
  } else {
    var qType = rawType.substr(0, bracePos)

    targetType = GENERATOR_RULE[qType]['targetType']
    // targetType += type.substr(bracePos, type.length - bracePos)

    if (LENGTH_TYPES.indexOf(qType) >= 0){
      typeLength = rawType.substr(bracePos)
    }
  }

  var simpleMark = false
  if (fieldData.nullMark && !fieldData.defaultValue){
    simpleMark = true
  }

  var hiddenMark = false

  return new Column({
    field: field,
    rawType: rawType,
    targetType: targetType,
    typeLength: typeLength,
    nullMark: fieldData.nullMark,
    defaultValue: fieldData.defaultValue,
    simpleMark: simpleMark,
    hiddenMark: hiddenMark,
    comment: ''
  })
}

exports.Table = Table
exports.Column = Column
exports.buildTable = Table.factory
