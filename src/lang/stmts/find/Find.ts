import * as Exps from "../../exp"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import { refreshGoal } from "../../refresh"
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

    const varMap = new Map(
      queryPatternNames(this.pattern).map((name) => [
        name,
        Exps.PatternVar(name),
      ]),
    )
    let goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    goals = goals.map((goal) => refreshGoal(mod, goal, varMap))
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    return formatSolutions(mod, solutions, this.pattern)
  }
}
