import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Private extends Stmt {
  constructor(public stmt: Stmt, public span: Span) {
    super()
  }

  async prepare(mod: Mod): Promise<void> {
    await this.stmt.prepare(mod)
  }

  prepareSync(mod: Mod): void {
    this.stmt.prepareSync(mod)
  }

  async execute(mod: Mod): Promise<void> {
    mod.privateDepth++
    await this.stmt.execute(mod)
    mod.privateDepth--
  }

  executeSync(mod: Mod): void {
    mod.privateDepth++
    this.stmt.executeSync(mod)
    mod.privateDepth--
  }
}
