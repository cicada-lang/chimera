import { ReplEvent, ReplEventHandler } from "@cicada-lang/framework/lib/repl"
import fs from "fs"
import process from "process"
import { createErrorReport, highlightErrorMessage } from "../lang/errors"
import { executeStmts } from "../lang/execute"
import { parseStmts } from "../lang/syntax"
import { Loader } from "../loader"
import { colors } from "../utils/colors"

export class AppReplEventHandler extends ReplEventHandler {
  pathname = process.cwd() + "/repl"
  loader = new Loader({
    onOutput: (output) => console.log(colors.blue(output)),
  })

  constructor() {
    super()
    this.loader.fetcher.register("file", (url) =>
      fs.readFileSync(url.pathname, "utf8"),
    )
    this.loader.fetcher.register("repl", (url) => {
      return url.pathname === this.pathname
        ? ""
        : fs.readFileSync(url.pathname, "utf8")
    })
  }

  greeting(): void {
    console.log(`Chimera ${app.config.pkg.version}`)
  }

  async handle(event: ReplEvent): Promise<void> {
    const { text } = event

    const url = new URL(`repl://${this.pathname}`)
    const mod = this.loader.load(url, { text: "" })

    try {
      const stmts = parseStmts(text)
      executeStmts(mod, stmts)
    } catch (error) {
      error = createErrorReport(error, text)
      if (error instanceof Error) {
        console.error(highlightErrorMessage(error.message))
      } else console.error(error)
    }
  }
}
