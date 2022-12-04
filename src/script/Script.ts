import * as Errors from "../lang/errors"
import type { Mod } from "../lang/mod"

export abstract class Script {
  abstract mod: Mod
  abstract text: string
  abstract run(): Promise<void>

  get pathname(): string {
    if (this.mod.options.url.pathname.startsWith(process.cwd())) {
      return "." + this.mod.options.url.pathname.slice(process.cwd().length)
    } else {
      return this.mod.options.url.pathname
    }
  }

  createErrorReport(
    error: unknown,
    text: string,
  ): Errors.ErrorReport | unknown {
    if (error instanceof Errors.ElaborationError) {
      return new Errors.ErrorReport(
        [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
      )
    }

    if (error instanceof Errors.TestingError) {
      return new Errors.ErrorReport(
        [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
      )
    }

    if (error instanceof Errors.ParsingError) {
      return new Errors.ErrorReport(
        [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
      )
    }

    return error
  }
}
