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
      throw this.createErrorReport(error, this.text)
    }
  }
}
