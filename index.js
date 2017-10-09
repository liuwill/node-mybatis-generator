'use strict'

var bluebird = require('bluebird')

var commander = require('./lib/commander')
var loader = require('./lib/loader')
var Connection = require('./lib/connect')
var tableModule = require('./lib/table')
var templateModule = require('./lib/template')

function main(cmdConfig, endCallback) {
  loader.initTarget(cmdConfig.outputPath)
  var mapperConfig = loader.loadMapperConfig(cmdConfig.mapperPath)
  var dbConfig = loader.loadDbConfig(cmdConfig.databasePath)

  var connHandle = new Connection(dbConfig)
  connHandle.query('show tables in ' + dbConfig.database).then(function (tables) {
    var queryPromises = []
    for (var i in tables) {
      queryPromises.push(connHandle.query('desc ' + tables[i].Tables_in_demo))
    }

    bluebird.all(queryPromises).then(function (tableList) {
      for (var j in tableList) {
        var queryTable = tableList[j]
        var tableData = tableModule.buildTable(tables[j].Tables_in_demo, queryTable)

        var templateData = templateModule.buildTemplate(mapperConfig, tableData)
        var fileContent = templateModule.render(templateData, templateModule.RENDER_TYPES.modal)
        console.log(fileContent)
      }

      endCallback(null)
    }).catch(function () {
      endCallback(new Error())
    })
  })
}

if (process.argv[1] === __filename) {
  try {
    var cmdConfig = commander.getCommandConfig()
    main(cmdConfig, function (err) {
      if (err) {
        process.exit(1)
      } else {
        process.exit(0)
      }
    })
  } catch (err) {
    if (err) {
      process.exit(1)
    } else {
      process.exit(0)
    }
  }
} else if (module && module.exports) {
  module.exports.generate = main
}
