#!/usr/bin/env -S node --no-warnings --stack-size=10000

const process = require("process")

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

const { createCommandRunner } = require("../lib/command-line")

createCommandRunner().run()
