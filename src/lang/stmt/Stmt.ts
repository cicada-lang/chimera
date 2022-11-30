import type { Mod } from "../mod"
import type { Span } from "../span"

export type ExecuteOptions = {
  testing?: boolean
}

export abstract class Stmt {
  abstract span?: Span
  abstract execute(mod: Mod, options?: ExecuteOptions): Promise<string | void>
  prepare(mod: Mod): void {}
}
