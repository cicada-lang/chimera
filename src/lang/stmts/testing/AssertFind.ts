import * as Errors from "../../errors"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import { buildSolveOptions, FindOption, QueryPattern } from "../find"

export class AssertFind extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public options: Array<FindOption>,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, buildSolveOptions(this.options))
    if (solutions.length === 0) {
      throw new Errors.AssertionError(`[AssertFind.execute] fail`, {
        span: this.span,
      })
    }
  }
}
