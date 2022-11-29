import type { Exp } from "../../exp/index.ts"
import type { Mod } from "../../mod/index.ts"
import type { Span } from "../../span/index.ts"
import { Stmt } from "../../stmt/index.ts"

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
