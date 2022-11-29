import type { Mod } from "../mod/index.ts"
import type { Span } from "../span/index.ts"

export abstract class Stmt {
  abstract span?: Span
  abstract execute(mod: Mod): Promise<string | void>
  prepare(mod: Mod): void {}
}
