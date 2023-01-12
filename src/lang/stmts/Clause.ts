import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromExps,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"

export class Clause extends Stmt {
  constructor(
    public relationName: string,
    public name: string | undefined,
    public exps: Array<Exp>,
    public goals: Array<GoalExp>,
    public span: Span,
  ) {
    super()
  }

  prepareSync(mod: Mod): void {
    mod.ensureRelationOfThisMod(this.relationName)
  }

  validateSync(mod: Mod): void {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExps(this.exps),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )
  }

  executeSync(mod: Mod): void {
    mod.defineClause(this.relationName, this.name, this.exps, this.goals)
  }
}
