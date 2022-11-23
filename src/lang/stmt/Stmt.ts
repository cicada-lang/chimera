import type { Mod } from "../mod"
import type { Span } from "../span"

export abstract class Stmt {
  abstract span?: Span
  abstract execute(mod: Mod): Promise<string | void>
  prepare(mod: Mod): void {}
}
