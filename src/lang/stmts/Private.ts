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
    await this.stmt.execute(mod)

    for (const name of await this.stmt.boundNames(mod)) {
      mod.privateNames.add(name)
    }
  }

  executeSync(mod: Mod): void {
    this.stmt.executeSync(mod)

    for (const name of this.stmt.boundNamesSync(mod)) {
      mod.privateNames.add(name)
    }
  }
}
