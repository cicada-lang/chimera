import type { Exp } from "../../exp"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
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

    const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    mod.defineClause(this.name, this.clauseName, this.exp, goals)
  }

  prepare(mod: Mod): void {
    mod.createRelation(this.name)
  }
}
