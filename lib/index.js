'use strict'

var fs = require('fs')
var path = require('path')

/**
 * 将表结构转换成模版数据结构
 */

var bluebird = require('bluebird')

function buildSavePath(basePath, packagePath) {

}

function saveTemplates(template) {

}

function writerFile(basePath, packagePath, templateContent) {
  var filePath = buildSavePath(basePath, packagePath)
  if (templateContent) {
    fs.writeFileSync(filePath, templateContent, 'utf8')
  }
}

module.exports = {
  saveTemplates: saveTemplates,
  buildSavePath: buildSavePath,
  writerFile: writerFile
}
