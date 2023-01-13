import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import { formatValue } from "../value"

export class If extends Stmt {
  constructor(
    public target: Exp,
    public stmts: Array<Stmt>,
    public elseIfs: Array<{ target: Exp; stmts: Array<Stmt> }>,
    public elseStmts: Array<Stmt>,
    public span: Span,
  ) {
    super()
  }

  executeSync(mod: Mod): void {
    const target = evaluate(mod, mod.env, this.target)
    if (target["@kind"] !== "Boolean") {
      throw new Errors.LangError(
        [
          `[If.executeSync] target of if must be a Boolean`,
          `  target: ${formatValue(target)}`,
        ].join("\n"),
      )
    }

    if (target.data) {
      mod.executeStmtsSync(this.stmts)
      return
    }

    for (const elseIf of this.elseIfs) {
      const target = evaluate(mod, mod.env, elseIf.target)
      if (target["@kind"] !== "Boolean") {
        throw new Errors.LangError(
          [
            `[If.executeSync] target else if must be a Boolean`,
            `  target: ${formatValue(target)}`,
          ].join("\n"),
        )
      }

      if (target.data) {
        mod.executeStmtsSync(elseIf.stmts)
        return
      }
    }

    mod.executeStmtsSync(this.elseStmts)
  }
}
