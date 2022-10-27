import * as Exps from "../../exp"
import { evaluate, Exp } from "../../exp"
import { Mod } from "../../mod"
import { Span } from "../../span"
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
    const value = evaluate(mod.env, this.exp)
    const goals = this.goals.map((goal) =>
      Exps.evaluateGoal(mod, mod.env, goal),
    )
    mod.defineClause(this.name, this.clauseName, value, goals)
  }
}
