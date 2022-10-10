import fs from "fs"
import readlineSync from "readline-sync"
import { Loader } from "../loader"

export class Runner {
  loader = new Loader({
    debugger: {
      report(solver) {
        console.log("---")
        console.log(solver.reportFormatYAML())
      },
      prompt(solver) {
        const input = readlineSync.question("debugger> ")
        if (input === "") return 0
        return Number.parseInt(input)
      },
    },
  })

  constructor() {
    this.loader.fetcher.register("file", (url) => fs.promises.readFile(url.pathname, "utf8"))
  }

  async run(url: URL, opts?: { silent?: boolean }): Promise<{ error?: unknown }> {
    try {
      const mod = await this.loader.load(url)
      const outputs = Array.from(mod.outputs.values())
      if (!opts?.silent) {
        const output = outputs.join("\n")
        if (output) console.log(output)
      }

      return { error: undefined }
    } catch (error) {
      if (!opts?.silent) {
        if (error instanceof Error) console.error(error.message)
        else console.error(error)
      }

      return { error }
    }
  }
}
