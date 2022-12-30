import { evaluateGoalExp } from "../../evaluate"
import type { Goal } from "../../goal"
import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import { refreshGoals } from "../../refresh"
import * as Values from "../../value"

export function prepareGoals(
  mod: Mod,
  goals: Array<GoalExp>,
  names: Array<string>,
): { goals: Array<Goal>; variables: Array<Values.PatternVar> } {
  const variables: Array<Values.PatternVar> = []
  const renames = new Map()
  for (const name of names) {
    const variable = Values.PatternVar(mod.freshen(name))
    variables.push(variable)
    renames.set(name, variable)
  }

  /**

     In a `mod`, `evaluateGoalExp` finds a `Value`
     from `name` of `GoalExps.Apply`.

  **/

  return {
    goals: refreshGoals(
      mod,
      renames,
      goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
    ),
    variables,
  }
}
