import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"

export class Let extends Stmt {
  constructor(public name: string, public exp: Exp, public span?: Span) {
    super()
  }

  async boundNames(): Promise<Array<string>> {
    return [this.name]
  }

  executeSync(mod: Mod): void {
    const value = evaluate(mod, mod.env, this.exp)
    mod.define(this.name, value)
  }
}
