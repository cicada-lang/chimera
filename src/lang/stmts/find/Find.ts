import * as Exps from "../../exp"
import type { Goal } from "../../goal"
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

    const goals = prepareGoals(mod, this.goals, queryPatternNames(this.pattern))
    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })
    return formatSolutions(mod, solutions, this.pattern)
  }
}

function prepareGoals(
  mod: Mod,
  goals: Array<GoalExp>,
  names: Array<string>,
): Array<Goal> {
  /**

       Only refresh goal can be used,
       because `refreshExp` also `etc` to `Objekt`.

    **/

  const varMap = new Map(names.map((name) => [name, Exps.PatternVar(name)]))

  const freshGoals = goals
    .map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    .map((goal) => refreshGoal(mod, goal, varMap))

  return freshGoals
}
