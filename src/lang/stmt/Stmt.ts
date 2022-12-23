import type { Mod } from "../mod"
import type { Span } from "../span"

export type ExecuteOptions = {
  testing?: boolean
}

export abstract class Stmt {
  abstract span?: Span

  async execute(mod: Mod, options?: ExecuteOptions): Promise<string | void> {
    return
  }

  async prepare(mod: Mod): Promise<void> {
    return
  }

  /**

     The `boundNames` is used by `Stmts.Private`
     to add `boundNames` of a sub-stmt to `mod.privateNames`.

  **/

  async boundNames(mod: Mod): Promise<Array<string>> {
    return []
  }
}
