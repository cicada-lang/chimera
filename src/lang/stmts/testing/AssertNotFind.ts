import { indent } from "../../../utils/indent"
import * as Errors from "../../errors"
import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import { formatSolutions, QueryPattern, queryPatternNames } from "../find"
import { prepareGoals } from "../utils/prepareGoals"

export class AssertNotFind extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const goals = prepareGoals(mod, this.goals, queryPatternNames(this.pattern))
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    if (solutions.length > 0) {
      throw new Errors.AssertionError(
        [
          `[AssertNotFind.execute] fail`,
          indent(
            `found solutions: ${formatSolutions(mod, solutions, this.pattern)}`,
          ),
        ].join("\n"),
        { span: this.span },
      )
    }
  }
}
