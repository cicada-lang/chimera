import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../../var-collection"
import {
  formatSolutions,
  QueryPattern,
  queryPatternNames,
  queryPatternToExp,
} from "../find"
import { prepareGoals } from "../utils/prepareGoals"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public limit: number,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExp(queryPatternToExp(this.pattern)),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )

    const { goals, variables } = prepareGoals(
      mod,
      this.goals,
      queryPatternNames(this.pattern),
    )
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    return formatSolutions(mod, solutions, variables)
  }
}
