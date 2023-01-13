import { evaluate } from "../evaluate"
import { Exp, formatExp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import { formatValue } from "../value"

export class Print extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  executeSync(mod: Mod): string {
    const value = evaluate(mod, mod.env, this.exp)
    return formatValue(value)
  }

  format(): string {
    return `print ${formatExp(this.exp)}`
  }
}
