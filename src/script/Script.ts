import { createErrorReport } from "../lang/errors/index.ts"
import { executeStmts } from "../lang/execute/index.ts"
import type { Mod } from "../lang/mod/index.ts"
import { parseStmts } from "../lang/syntax/index.ts"

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
