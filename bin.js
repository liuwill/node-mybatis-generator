#!/usr/bin/env node
var commander = require('./lib/commander')
var generate = require('./')

try {
  var cmdConfig = commander.getCommandConfig()
  generate(cmdConfig, function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      process.exit(0)
    }
  })
} catch (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    process.exit(0)
  }
}
