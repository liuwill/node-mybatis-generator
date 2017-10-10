'use strict'

var bluebird = require('bluebird')

var loader = require('./lib/loader')
var conn = require('./lib/connect')
var tableModule = require('./lib/table')
var templateModule = require('./lib/template')
var generatorModule = require('./lib/generator')

function generate(cmdConfig, endCallback) {
  loader.initTarget(cmdConfig.outputPath)
  var mapperConfig = loader.loadMapperConfig(cmdConfig.mapperPath)
  var dbConfig = loader.loadDbConfig(cmdConfig.databasePath)

  var connHandle = conn.createConnection(dbConfig)

  connHandle.query('show tables in ' + dbConfig.database).then(function (tables) {
    var queryPromises = []
    for (var i in tables) {
      queryPromises.push(connHandle.query('desc ' + tables[i]['Tables_in_' + dbConfig.database]))
    }

    bluebird.all(queryPromises).then(function (tableList) {
      for (var j in tableList) {
        var queryTable = tableList[j]
        var tableData = tableModule.buildTable(tables[j]['Tables_in_' + dbConfig.database], queryTable)

        var templateData = templateModule.buildTemplate(mapperConfig, tableData)
        var contentTypes = ['mapper', 'modal', 'xml']

        for (var k in contentTypes) {
          var curType = contentTypes[k]
          var fileContent = templateModule.render(templateData, templateModule.RENDER_TYPES[curType])
          var targetFileName = templateData[curType + 'Name']

          var realPackage = mapperConfig[curType].type + '.' + mapperConfig[curType].package
          generatorModule.writerFile(cmdConfig.outputPath, realPackage, targetFileName, fileContent)
          console.log('create file: ' + targetFileName + ' At: ' + mapperConfig[curType].package)
        }
      }
      endCallback(null)
    }).catch(function () {
      endCallback(new Error())
    })
  })
}

module.exports = generate
