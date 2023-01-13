import { indent } from "../../utils/indent"
import { evaluate } from "../evaluate"
import * as Exps from "../exp"
import { Exp, formatArgs, formatExp } from "../exp"
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

  executeSync(mod: Mod): void {
    const exp = Exps.Fn(this.patterns, this.stmts, this.span)
    const value = evaluate(mod, mod.env, exp)
    mod.define(this.name, value)
  }

  format(): string {
    const patterns = this.patterns.map(formatExp)
    const stmts = this.stmts.map((stmt) => stmt.format())
    return `function ${this.name}${formatArgs(patterns)} {\n${indent(
      stmts.join("\n"),
    )}\n}`
  }
}
