import { createErrorReport } from "../lang/errors/index.js"
import { executeStmts } from "../lang/execute/index.js"
import type { Mod } from "../lang/mod/index.js"
import { parseStmts } from "../lang/syntax-old/index.js"

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
