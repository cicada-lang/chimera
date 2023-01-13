import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import { Exp, formatExp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import { formatValue } from "../value"

export class Assert extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  executeSync(mod: Mod): void {
    const value = evaluate(mod, mod.env, this.exp)

    if (value["@kind"] !== "Boolean") {
      throw new Errors.ElaborationError(
        [
          `[Assert.executeSync] assertion fail, because the value is not a Boolean`,
          `  exp: ${formatExp(this.exp)}`,
          `  value: ${formatValue(value)}`,
        ].join("\n"),
        { span: this.span },
      )
    }

    if (value.data === false) {
      throw new Errors.ElaborationError(
        [
          `[Assert.executeSync] assertion fail, because the value is false instead of true`,
          `  exp: ${formatExp(this.exp)}`,
        ].join("\n"),
        { span: this.span },
      )
    }
  }

  format(): string {
    return `assert ${formatExp(this.exp)}`
  }
}
