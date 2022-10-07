import { LangError } from "../../errors"
import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { Solver } from "../../solver"
import { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Success extends Stmt {
  constructor(public names: Array<string>, public goals: Array<Exps.Goal>, public span?: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod.env, goal))
    const solver = Solver.forGoals(goals)
    const solutions = solver.solve(mod, mod.env)
    if (solutions.length === 0) {
      throw new LangError(`expect success`)
    }
  }
}
