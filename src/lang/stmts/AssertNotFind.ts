import { indent } from "../../utils/indent"
import * as Errors from "../errors"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import { Solver } from "../solver"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  formatFoundVariable,
  formatFoundVariables,
} from "./utils/formatFoundVariables"
import { prepareGoals } from "./utils/prepareGoals"
import { QueryPattern, queryPatternNames } from "./utils/QueryPattern"

export class AssertNotFind extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  executeSync(mod: Mod): void {
    const { goals, variables } = prepareGoals(
      mod,
      this.goals,
      queryPatternNames(this.pattern),
    )
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    if (solutions.length > 0) {
      switch (this.pattern["@kind"]) {
        case "QueryPatternNames": {
          const found = formatFoundVariables(mod, solutions, variables)
          throw new Errors.AssertionError(
            [`[AssertNotFind.execute] fail`, indent(`found: ${found}`)].join(
              "\n",
            ),
            { span: this.span },
          )
        }

        case "QueryPatternName": {
          const found = formatFoundVariable(mod, solutions, variables[0])
          throw new Errors.AssertionError(
            [`[AssertNotFind.execute] fail`, indent(`found: ${found}`)].join(
              "\n",
            ),
            { span: this.span },
          )
        }
      }
    }
  }
}
