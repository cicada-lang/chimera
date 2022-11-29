import * as Errors from "../lang/errors"
import type { Mod } from "../lang/mod"
import { parseStmts } from "../lang/syntax"
import { Script } from "../script"

export class DefaultScript extends Script {
  constructor(public mod: Mod, public text: string) {
    super()
  }

  async run(): Promise<void> {
    try {
      const stmts = parseStmts(this.text)
      await this.mod.executeStmts(stmts)
    } catch (error) {
      if (error instanceof Errors.ElaborationError) {
        throw new Errors.ErrorReport(error.report(this.text))
      }

      if (error instanceof Errors.ParsingError) {
        throw new Errors.ErrorReport(error.report(this.text))
      }

      throw error
    }
  }
}
