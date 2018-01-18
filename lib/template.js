'use strict'

/**
 * 对应模版的数据类型
 */

var path = require('path')
var nunjucks = require('nunjucks')
var simpleCamelcase = require('simple-camelcase')

var COLUMN_FIELDS = ['typeLength', 'nullMark', 'defaultValue', 'nullMark', 'defaultValue', 'simpleMark', 'hiddenMark']

var PACKAGE_MAP = {
  'BigDecimal': 'java.math.BigDecimal',
  'Date': 'java.sql.Date'
}

var RENDER_TYPES = {
  'mapper': 'mapper',
  'modal': 'modal',
  'xml': 'xml'
}

function Template(tableName) {
  this.tableName = tableName
  this.baseParamName = ''
  this.baseClassName = ''
  this.modalPackage = ''
  this.mapperPackage = ''
  this.xmlPackage = ''

  this.mapperName = ''
  this.modalName = ''
  this.xmlName = ''

  this.packages = []
  this.columns = []
}

function TemplateItem(fieldName) {
  this.field = fieldName

  this.targetType = ''
  this.lowerCamelField = ''
  this.upperCamelField = ''
}

function buildTemplate(mapperConfig, table) {
  var template = new Template(table.tableName)
  var baseClassName = simpleCamelcase.toUpperCamel(template.tableName)
  var baseParamName = simpleCamelcase.toLowerCamel(table.tableName)

  template.baseClassName = baseClassName
  template.baseParamName = baseParamName

  template.modalPackage = mapperConfig.modal.package
  template.mapperPackage = mapperConfig.mapper.package
  template.xmlPackage = mapperConfig.xml.package

  template.mapperName = baseClassName + 'Mapper.java'
  template.modalName = baseClassName + 'PO.java'
  template.xmlName = baseClassName + 'Mapper.xml'

  for (var i in table.fields) {
    var fieldName = table.fields[i]
    var fieldData = table[fieldName]
    if (fieldData.hiddenMark){
      continue
    }

    var targetType = fieldData.targetType
    var templateItem = new TemplateItem(fieldName)
    templateItem.targetType = targetType

    for(var k in COLUMN_FIELDS) {
      var key = COLUMN_FIELDS[k]
      templateItem[key] = fieldData[key]
    }

    templateItem.lowerCamelField = simpleCamelcase.toLowerCamel(fieldName)
    templateItem.upperCamelField = simpleCamelcase.toUpperCamel(fieldName)

    if (PACKAGE_MAP[targetType]) {
      var typeReady = true
      for (var j in template.packages) {
        if (template.packages[j] === PACKAGE_MAP[targetType]) {
          typeReady = false
          break
        }
      }

      if (typeReady) {
        template.packages.push(PACKAGE_MAP[targetType])
      }
    }
    template.columns.push(templateItem)
  }
  return template
}

function render(template, type) {
  var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, './templates')))
  return nunjucksEnv.render(type + '.njk', template)
}

module.exports = {
  Template: Template,
  TemplateItem: TemplateItem,
  buildTemplate: buildTemplate,
  PACKAGE_MAP: PACKAGE_MAP,
  RENDER_TYPES: RENDER_TYPES,
  render: render
}
