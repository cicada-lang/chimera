import type { Goal } from "../../goal"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import { refreshGoal } from "../../refresh"
import * as Values from "../../value"

/**

   In a `mod`, `evaluateGoalExp` resolves `Relation`
   from `name` of `GoalExps.Apply`.

   Maybe `Goal` should have `mod`.

   And only refresh goal can be used,
   because `refreshExp` also `etc` to `Objekt`.

   Maybe we should distinguish `Exp` from `Value`
   (`Values.Objekt` always has `etc`).

**/

export function prepareGoals(
  mod: Mod,
  goals: Array<GoalExp>,
  names: Array<string>,
): Array<Goal> {
  const varMap = new Map(names.map((name) => [name, Values.PatternVar(name)]))

  const freshGoals = goals
    .map((goal) => GoalExps.evaluateGoalExp(mod, mod.env, goal))
    .map((goal) => refreshGoal(mod, goal, varMap))

  return freshGoals
}
