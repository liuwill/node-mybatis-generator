'use strict'

var fs = require('fs')
var path = require('path')

exports.loadMapperConfig = loadJson

exports.loadDbConfig = loadJson

exports.loadJson = loadJson

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('config file not exists')
  }
  var fileStat = fs.statSync(filePath)
  if (!fileStat.isFile()) {
    throw new Error('config file not exists')
  }

  var fileData = fs.readFileSync(filePath)
  var configData = {}
  try {
    configData = JSON.parse(fileData)
  } catch (err) {
    throw new Error('config file format malformed')
  }

  return configData
}

exports.initTarget = function (filePath) {
  var resolvedPath = path.resolve(filePath)
  var dirPath = path.dirname(resolvedPath)

  if (fs.existsSync(resolvedPath)) {
    var fileStat = fs.statSync(resolvedPath)
    if (!fileStat.isDirectory()) {
      throw new Error('target directory can not be file')
    } else if (fs.readdirSync(resolvedPath).length) {
      throw new Error('target directory must be empty')
    }
  } else if (fs.existsSync(dirPath)) {
    var dirStat = fs.statSync(dirPath)
    if (!dirStat.isDirectory()) {
      throw new Error('target can not be file')
    }
    fs.mkdirSync(resolvedPath)
  } else {
    throw new Error('target path not exist')
  }
}
