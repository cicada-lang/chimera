import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import type { Mod } from "../../mod"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Rule extends Stmt {
  constructor(
    public name: string,
    public clauseName: string | undefined,
    public exp: Exp,
    public goals: Array<Exps.Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    mod.findOrCreateRelation(this.name)
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod, goal))
    mod.defineClause(this.name, this.clauseName, this.exp, goals)
  }
}
