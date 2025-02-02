import { Command, CommandRunner } from "@xieyuheng/command-line"
import ty from "@xieyuheng/ty"
import fs from "fs"
import Path from "path"
import { Runner } from "../Runner.ts"

type Args = { file: string }
type Opts = {}

export class RunCommand extends Command<Args, Opts> {
  name = "run"

  description = "Run a file"

  args = { file: ty.string() }
  opts = { watch: ty.optional(ty.boolean()) }

  runner = new Runner()

  constructor() {
    super()
  }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `The ${blue(this.name)} command runs through an file,`,
      `evaluating top-level expressions, and prints the results.`,
      ``,
      `It supports ${blue(".md")} and ${blue(".mo")} file extensions.`,
      ``,
      blue(
        `  ${runner.name} ${this.name} docs/books/clause-and-effect/01-party-pairs.mo`,
      ),
      ``,
      `You can use ${
        blue("--watch")
      } to let the program stand by, and react to changes.`,
      ``,
      blue(
        `  ${runner.name} ${this.name} docs/books/clause-and-effect/01-party-pairs.mo --watch`,
      ),
      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const url = createURL(argv["file"])

    const { error } = this.runner.run(url)
    if (error) {
      process.exit(1)
    }
  }
}

function createURL(path: string): URL {
  if (ty.url().isValid(path)) {
    return new URL(path)
  }

  if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    const fullPath = Path.resolve(path)
    return new URL(`file://${fullPath}`)
  }

  throw new Error(`I can not create URL from path: ${path}`)
}
