import type { Datactor } from "../../datatype"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Datatype extends Stmt {
  constructor(
    public name: string,
    public datactors: Array<Datactor>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    // mod.findRelationOrFail(this.name)
    // const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    // mod.defineClause(this.name, this.clauseName, this.exp, goals)
  }

  // prepare(mod: Mod): void {
  //   mod.createRelation(this.name)
  // }
}
