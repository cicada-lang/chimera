import { Mod } from "../mod"
import { Span } from "../span"

export type StmtOutput = string

export abstract class Stmt {
  abstract span?: Span
  abstract execute(mod: Mod): Promise<StmtOutput | void>
  undo(mod: Mod): void {}
}
