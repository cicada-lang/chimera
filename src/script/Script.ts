import * as Errors from "../lang/errors"
import type { Mod } from "../lang/mod"
import { colors } from "../utils/colors"

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
        highlightReport(
          [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
        ),
      )
    }

    if (error instanceof Errors.TestingError) {
      return new Errors.ErrorReport(
        highlightReport(
          [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
        ),
      )
    }

    if (error instanceof Errors.ParsingError) {
      return new Errors.ErrorReport(
        highlightReport(
          [`[Script.run] ${this.pathname}`, error.report(text)].join("\n"),
        ),
      )
    }

    return error
  }
}

function highlightReport(report: string): string {
  return report.split("\n").map(highlightLine).join("\n")
}

function highlightLine(line: string): string {
  if (!line.startsWith("[")) return line
  const i = line.indexOf("]")
  if (i === -1) return line
  const head = line.slice(0, i + 1)
  const rest = line.slice(i + 1)
  return colors.red(colors.bold(head)) + rest
}
