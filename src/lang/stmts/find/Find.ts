import {
  buildSolveOptions,
  FindOption,
  formatSubstitutionForQueryPattern,
  QueryPattern,
} from "."
import * as Exps from "../../exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public options: Array<FindOption>,
    public goals: Array<Exps.Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod, goal))
    const solver = Solver.fromGoals(this.pattern, goals)
    const substitutions = solver.solve(mod, buildSolveOptions(this.options))
    return formatSubstitutionForQueryPattern(substitutions, this.pattern)
  }
}
