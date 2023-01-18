import { indent } from "../../utils/indent"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import { formatExp, formatValue } from "../format"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

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

  format(): string {
    const stmts = this.stmts.map((stmt) => stmt.format())

    if (this.elseIfs.length === 0 && this.elseStmts.length === 0) {
      return `if ${formatExp(this.target)} {\n${indent(stmts.join("\n"))}\n}`
    }

    const elseStmts = this.elseStmts.map((stmt) => stmt.format())

    if (this.elseIfs.length === 0) {
      return `if ${formatExp(this.target)} {\n${indent(
        stmts.join("\n"),
      )}\n} else {\n${indent(elseStmts.join("\n"))}\n}`
    }

    const elseIfs = this.elseIfs.map(
      ({ target, stmts }) =>
        `else if ${formatExp(this.target)} {\n${indent(
          stmts.map((stmt) => stmt.format()).join("\n"),
        )}\n}`,
    )

    return `if ${formatExp(this.target)} {\n${indent(
      stmts.join("\n"),
    )}\n} ${elseIfs.join(" ")} else {\n${indent(elseStmts.join("\n"))}\n}`
  }
}
