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

  async boundNames(mod: Mod): Promise<Array<string>> {
    return []
  }
}
