import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Export extends Stmt {
  constructor(public stmt: Stmt, public span: Span) {
    super()
  }

  async prepare(mod: Mod): Promise<void> {
    mod.exportDepth++
    await this.stmt.prepare(mod)
    mod.exportDepth--
  }

  prepareSync(mod: Mod): void {
    mod.exportDepth++
    this.stmt.prepareSync(mod)
    mod.exportDepth--
  }

  async execute(mod: Mod): Promise<void> {
    mod.exportDepth++
    await this.stmt.execute(mod)
    mod.exportDepth--
  }

  executeSync(mod: Mod): void {
    mod.exportDepth++
    this.stmt.executeSync(mod)
    mod.exportDepth--
  }

  formatStmt(): string {
    return `export ${this.stmt.formatStmt()}`
  }
}
