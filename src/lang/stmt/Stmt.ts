import { Mod } from "../mod"

export type StmtOutput = string

export abstract class Stmt {
  // abstract span?: Span
  abstract execute(mod: Mod): Promise<StmtOutput | void>
  undo(mod: Mod): void {}
}
