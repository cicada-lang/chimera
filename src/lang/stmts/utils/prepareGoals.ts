import { envExtend } from "../../env"
import { evaluateGoalExp } from "../../evaluate"
import type { Goal } from "../../goal"
import type { GoalExp } from "../../goal-exp"
import type { Mod } from "../../mod"
import * as Values from "../../value"
import { collectVarsFromGoalExps } from "../../value"

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

  return {
    goals: goals.map((goal) => evaluateGoalExp(mod, env, goal)),
    variables,
  }
}
