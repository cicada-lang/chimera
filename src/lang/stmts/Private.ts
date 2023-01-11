import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Private extends Stmt {
  constructor(public stmts: Array<Stmt>, public span: Span) {
    super()
  }

  async prepare(mod: Mod): Promise<void> {
    for (const stmt of this.stmts) {
      await stmt.prepare(mod)
    }
  }

  prepareSync(mod: Mod): void {
    for (const stmt of this.stmts) {
      stmt.prepareSync(mod)
    }
  }

  async execute(mod: Mod): Promise<void> {
    for (const stmt of this.stmts) {
      await stmt.execute(mod)

      for (const name of await stmt.boundNames(mod)) {
        mod.privateNames.add(name)
      }
    }
  }

  executeSync(mod: Mod): void {
    for (const stmt of this.stmts) {
      stmt.executeSync(mod)

      for (const name of stmt.boundNamesSync(mod)) {
        mod.privateNames.add(name)
      }
    }
  }
}
