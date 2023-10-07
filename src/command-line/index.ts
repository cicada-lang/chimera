import { CommandRunner, CommandRunners } from "@xieyuheng/command-line"
import "../app"
import * as Commands from "./commands"

export function createCommandRunner(): CommandRunner {
  return new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.DefaultCommand(),
    commands: [
      new Commands.ReplCommand(),
      new Commands.RunCommand(),
      new Commands.CommonHelp(),
    ],
  })
}
