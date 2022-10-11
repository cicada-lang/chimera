import * as Exps from "../../exp"
import { Mod } from "../../mod"
import { Solver } from "../../solver"
import { Span } from "../../span"
import { Stmt } from "../../stmt"
import {
  buildSolveOptions,
  formatSolutionForQueryPattern,
  QueryOption,
  QueryPattern,
} from "../query"

export class Query extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public options: Array<QueryOption>,
    public goals: Array<Exps.Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod.env, goal))
    const solver = Solver.fromGoals(this.pattern, goals)
    const solutions = solver.solve(mod, mod.env, buildSolveOptions(this.options))
    return formatSolutionForQueryPattern(solutions, this.pattern)
  }
}
