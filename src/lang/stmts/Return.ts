import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import { Exp, formatExp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import type { Value } from "../value"
import { formatValue } from "../value"

export class ReturnValue extends Errors.LangError {
  constructor(public value: Value) {
    super(
      [
        `[ReturnValue] can not use return at top-level`,
        `  return value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }
}

export class Return extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  executeSync(mod: Mod): void {
    throw new ReturnValue(evaluate(mod, mod.env, this.exp))
  }

  format(): string {
    return `return ${formatExp(this.exp)}`
  }
}
