import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import { Solver } from "../solver"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"
import {
  formatFoundVariable,
  formatFoundVariables,
} from "./utils/formatFoundVariables"
import { prepareGoals } from "./utils/prepareGoals"
import {
  QueryPattern,
  queryPatternNames,
  queryPatternToExp,
} from "./utils/QueryPattern"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span: Span,
  ) {
    super()
  }

  validateSync(mod: Mod): void {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExp(queryPatternToExp(this.pattern)),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )
  }

  executeSync(mod: Mod): string {
    const { goals, variables } = prepareGoals(
      mod,
      this.goals,
      queryPatternNames(this.pattern),
    )
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })

    switch (this.pattern["@kind"]) {
      case "QueryPatternNames": {
        return formatFoundVariables(mod, solutions, variables)
      }

      case "QueryPatternName": {
        return formatFoundVariable(mod, solutions, variables[0])
      }
    }
  }
}
