import type { Exp } from "../../exp"
import type { GoalExp } from "../../goal-exp"
import { evaluateGoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../../var-collection"

export class Relation extends Stmt {
  constructor(
    public name: string,
    public clauseName: string | undefined,
    public exp: Exp,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExp(this.exp),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )

    /**

       We do not need to call `refreshGoal` here,
       because `pursue` will call `refreshClause` on `Apply`.

       We should refactor this by:

       - refresh `Value` instead of `Exp`.
       - add `Values.Object` always has `etc`.

    **/

    mod.defineClause(
      this.name,
      this.clauseName,
      this.exp,
      this.goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
    )
  }

  prepare(mod: Mod): void {
    mod.createRelation(this.name)
  }
}
