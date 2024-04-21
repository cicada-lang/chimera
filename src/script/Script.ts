import { createErrorReport } from "../lang/errors"
import { executeStmts } from "../lang/execute"
import type { Mod } from "../lang/mod"
import { parseStmts } from "../lang/syntax"

export class Script {
  constructor(
    public mod: Mod,
    public text: string,
  ) {}

  run(): void {
    try {
      const stmts = parseStmts(this.text)
      executeStmts(this.mod, stmts)
    } catch (error) {
      throw createErrorReport(error, this.text)
    }
  }
}
