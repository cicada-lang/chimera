import type { Exp } from "../../exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import {
  varCollectionFromExp,
  varCollectionValidate,
} from "../../var-collection"

export class RelationFact extends Stmt {
  constructor(
    public name: string,
    public clauseName: string | undefined,
    public exp: Exp,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    varCollectionValidate(varCollectionFromExp(this.exp))

    mod.findRelationOrFail(this.name)
    mod.defineClause(this.name, this.clauseName, this.exp)
  }

  prepare(mod: Mod): void {
    mod.createRelation(this.name)
  }
}
