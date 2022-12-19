import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Private extends Stmt {
  constructor(public stmts: Array<Stmt>, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    for (const stmt of this.stmts) {
      await stmt.execute(mod)

      for (const name of await stmt.boundNames(mod)) {
        mod.privateNames.add(name)
      }
    }
  }

  async prepare(mod: Mod): Promise<void> {
    for (const stmt of this.stmts) {
      await stmt.prepare(mod)
    }
  }
}
