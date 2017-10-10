'use strict'

var fs = require('fs')
var path = require('path')

/**
 * 将表结构转换成模版数据结构
 */

function buildSavePath(basePath, packagePath, fileName) {
  return path.resolve(basePath, packagePath.split('.').join('/'), fileName)
}

function writerFile(basePath, packagePath, fileName, templateContent) {
  var filePath = buildSavePath(basePath, packagePath, fileName)

  if (templateContent) {
    var packageLoop = packagePath.split('.')
    var fullBasePath = path.resolve(basePath)

    for (var i = 0; i < packageLoop.length; i++) {
      var currentPath = path.join(fullBasePath, packageLoop.slice(0, i + 1).join('/'))

      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath)
      }
    }
    fs.writeFileSync(filePath, templateContent, 'utf8')
  }
}

module.exports = {
  buildSavePath: buildSavePath,
  writerFile: writerFile
}
