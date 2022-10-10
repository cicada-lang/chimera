import { Mod } from "../lang/mod"
import { parseStmts } from "../lang/parse"
import { Script } from "../script"

export class DefaultScript extends Script {
  constructor(public mod: Mod, public text: string) {
    super()
  }

  async run(): Promise<void> {
    const stmts = parseStmts(this.text)
    await this.mod.executeStmts(stmts)
  }
}
