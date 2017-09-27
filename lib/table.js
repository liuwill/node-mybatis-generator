var GENERATOR_RULE = {
  'VARCHAR': 'String',
  'TEXT': 'String',
  'TINYTEXT': 'String',
  'INTEGER': 'Integer',
  'INT': 'Integer',
  'TINY': 'Integer',
  'FLOAT': 'Float',
  'REAL': 'Double',
  'DOUBLE': 'Double',
  'DECIMAL': 'BigDecimal',
  'DATETIME': 'Date',
  'Date': 'Date'
}

exports.PACKAGE_MAP = {
  'BigDecimal': 'java.math.BigDecimal',
  'Date': 'java.sql.Date'
}

function Table(tableName) {
  this.tableName = tableName
  this.fields = []
  this.data = {}

  this.addCol = function (field, type) {
    var config = Column.factory(field, type)

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
    var type = tableData["Type"]
    var field = tableData["Field"]

    dbTable.addCol(field, type)
    //console.log(tableData["Type"]+":"+tableData["Field"])
  }
  return dbTable
}

function Column(data) {
  this.rawType = data.rawType
  this.targetType = data.targetType
  this.field = data.field
  this.comment = data.comment
}

Column.factory = function (field, type) {
  var bracePos = type.indexOf("(")
  var rawType = type.toUpperCase()
  var targetType = ""
  if (bracePos < 0) {
    targetType = GENERATOR_RULE[rawType]['targetType']
  } else {
    var qType = rawType.substr(0, bracePos)

    targetType = GENERATOR_RULE[qType]['targetType']
    targetType += type.substr(bracePos, type.length - bracePos)
  }

  return new Column({
    field: field,
    rawType: rawType,
    targetType: targetType,
    comment: ""
  })
}

exports.Table = Table
exports.Column = Column
