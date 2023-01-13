import { evaluate } from "../evaluate"
import { Exp, formatExp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Compute extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  executeSync(mod: Mod): void {
    evaluate(mod, mod.env, this.exp)
  }

  format(): string {
    return `compute ${formatExp(this.exp)}`
  }
}
