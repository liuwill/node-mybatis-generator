'use strict'

/**
 * 从命令行参数中读取用户的执行参数
 */

var yargs = require('yargs')
var commander = yargs
  .usage('node mybatis generator.\nUsage: $0 -c <config> -o <output> -d <database>')
  .option('config', {
    describe: '生成mybatis相关配置',
    alias: 'c',
    default: 'mapper.json'
  })
  .option('database', {
    describe: '数据库配置文件',
    alias: 'd',
    default: 'db.json'
  })
  .option('output', {
    describe: '输出目录',
    alias: 'o',
    default: 'target'
  })
  .help('help')

exports.getCommandConfig = function () {
  var cmdConfig = {
    mapperPath: '',
    databasePath: '',
    outputPath: ''
  }

  var argv = commander.argv
  cmdConfig.outputPath = argv.output
  cmdConfig.mapperPath = argv.config
  cmdConfig.databasePath = argv.database

  return cmdConfig
}

exports.commander = commander
