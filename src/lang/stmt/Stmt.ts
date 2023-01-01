import type { Mod } from "../mod"
import type { Span } from "../span"

export abstract class Stmt {
  abstract span?: Span

  prepareSync?: (mod: Mod) => Promise<void>
  validateSync?: (mod: Mod) => Promise<void>
  executeSync?: (mod: Mod) => Promise<string | void>

  async prepare(mod: Mod): Promise<void> {
    if (this.prepareSync !== undefined) {
      return this.prepareSync(mod)
    }
  }

  async validate(mod: Mod): Promise<void> {
    if (this.validateSync !== undefined) {
      return this.validateSync(mod)
    }
  }

  async execute(mod: Mod): Promise<string | void> {
    if (this.executeSync !== undefined) {
      return this.executeSync(mod)
    }
  }

  /**

     The `boundNames` is used by `Stmts.Private`
     to add `boundNames` of a sub-stmt to `mod.privateNames`.

  **/

  async boundNames(mod: Mod): Promise<Array<string>> {
    return []
  }

  format(): string {
    return "TODO"
  }
}
