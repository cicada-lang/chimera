import type { Exp } from "../../exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class RelationFact extends Stmt {
  constructor(public name: string, public exp: Exp, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.findRelationOrFail(this.name)
    mod.defineClause(this.name, undefined, this.exp)
  }

  prepare(mod: Mod): void {
    mod.createRelation(this.name)
  }
}
