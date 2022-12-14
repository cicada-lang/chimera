import * as Errors from "../lang/errors"
import type { Mod } from "../lang/mod"

export abstract class Script {
  abstract mod: Mod
  abstract text: string
  abstract run(): Promise<void>

  createErrorReport(
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
}
