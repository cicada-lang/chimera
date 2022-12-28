import { colors } from "../../utils/colors"
import * as Errors from "../errors"

export function createErrorReport(
  error: unknown,
  text: string,
): Errors.ErrorReport | unknown {
  if (error instanceof Errors.ElaborationError) {
    return new Errors.ErrorReport(error.report(text))
  }

  if (error instanceof Errors.TestingError) {
    return new Errors.ErrorReport(error.report(text))
  }

  if (error instanceof Errors.ParsingError) {
    return new Errors.ErrorReport(error.report(text))
  }

  return error
}

export function highlightErrorMessage(report: string): string {
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
