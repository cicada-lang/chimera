import * as Errors from "../../errors"
import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import { prepareGoals } from "../utils/prepareGoals"
import type { QueryPattern } from "../utils/QueryPattern"
import { queryPatternNames } from "../utils/QueryPattern"

export class AssertFind extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const { goals, variables } = prepareGoals(
      mod,
      this.goals,
      queryPatternNames(this.pattern),
    )
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    if (solutions.length === 0) {
      throw new Errors.AssertionError(`[AssertFind.execute] fail`, {
        span: this.span,
      })
    }
  }
}
