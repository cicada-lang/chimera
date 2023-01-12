import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Fn extends Stmt {
  constructor(
    public name: string,
    public patterns: Array<Exp>,
    public stmts: Array<Stmt>,
    public span: Span,
  ) {
    super()
  }

  boundNamesSync(): Array<string> {
    return [this.name]
  }

  executeSync(mod: Mod): void {
    const exp = Exps.Fn(this.patterns, this.stmts, this.span)
    const value = evaluate(mod, mod.env, exp)
    mod.define(this.name, value)
  }
}
