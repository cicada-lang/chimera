import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class ExportNames extends Stmt {
  constructor(public names: Array<string>, public span: Span) {
    super()
  }

  async prepare(mod: Mod): Promise<void> {
    for (const name of this.names) {
      mod.exported.add(name)
    }
  }

  prepareSync(mod: Mod): void {
    for (const name of this.names) {
      mod.exported.add(name)
    }
  }

  formatStmt(): string {
    return `export { ${this.names.join("\n")} }`
  }
}
