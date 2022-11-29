import type { Exp } from "../../exp/index.ts"
import type { GoalExp } from "../../goal-exp/index.ts"
import * as GoalExps from "../../goal-exp/index.ts"
import type { Mod } from "../../mod/index.ts"
import type { Span } from "../../span/index.ts"
import { Stmt } from "../../stmt/index.ts"

export class RelationClause extends Stmt {
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
    mod.findRelationOrFail(this.name)
    const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    mod.defineClause(this.name, this.clauseName, this.exp, goals)
  }

  prepare(mod: Mod): void {
    mod.createRelation(this.name)
  }
}
