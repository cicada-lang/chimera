import {
  CommandRunner,
  CommandRunners,
  Commands as BuiltInCommands,
} from "@xieyuheng/command-line"
import "../app/index.ts"
import * as Commands from "./commands/index.ts"

export function createCommandRunner(): CommandRunner {
  return new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.DefaultCommand(),
    commands: [
      new Commands.RunCommand(),
      new BuiltInCommands.CommonHelpCommand(),
    ],
  })
}
