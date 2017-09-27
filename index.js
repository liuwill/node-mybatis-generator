var argv = require('yargs')
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
  .argv

var command = process.argv[0]
var config = argv.config
var database = argv.database
var output = argv.output

function main() {
  console.log(command, config, database, output)
}

if (config && database && output) {
  main()
}
