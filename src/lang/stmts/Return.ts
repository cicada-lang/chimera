import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import type { Value } from "../value"

export class ReturnValue {
  constructor(public value: Value) {}
}

export class Return extends Stmt {
  constructor(public exp: Exp, public span: Span) {
    super()
  }

  executeSync(mod: Mod): void {
    throw new ReturnValue(evaluate(mod, mod.env, this.exp))
  }
}
