import * as Clauses from "../clause"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class Fact extends Stmt {
  constructor(public name: string, public exp: Exp, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.defineClause(this.name, Clauses.Rule("TODO", this.exp, []))
  }
}
