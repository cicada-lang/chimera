import { envExtend } from "../../env"
import { evaluateGoalExp } from "../../evaluate"
import type { Goal } from "../../goal"
import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import * as Values from "../../value"
import { collectVarsFromGoalExps } from "../../value"

export function prepareGoals(
  mod: Mod,
  goals: Array<GoalExp>,
  names: Array<string>,
): { goals: Array<Goal>; variables: Array<Values.PatternVar> } {
  const variables: Array<Values.PatternVar> = []
  let env = mod.env
  for (const name of names) {
    const variable = Values.PatternVar(mod.freshen(name))
    variables.push(variable)
    env = envExtend(env, name, variable)
  }

  const bindings = collectVarsFromGoalExps(goals)
  for (const name of bindings) {
    if (!names.includes(name)) {
      env = envExtend(env, name, Values.PatternVar(mod.freshen(name)))
    }
  }

  /**

     In a `mod`, `evaluateGoalExp` finds a `Value`
     from `name` of `GoalExps.Apply`.

  **/

  return {
    goals: goals.map((goal) => evaluateGoalExp(mod, env, goal)),
    variables,
  }
}
