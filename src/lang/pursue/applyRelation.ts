import { Env, envExtend } from "../env"
import { evaluate, evaluateGoalExp } from "../evaluate"
import type { Mod } from "../mod"
import { pursueEqual } from "../pursue"
import type { Solution } from "../solution"
import type { Value } from "../value"
import * as Values from "../value"

export function applyRelation(
  mod: Mod,
  env: Env,
  solution: Solution,
  target: Values.Relation,
  arg: Value,
): Array<Solution> {
  return target.clauses.flatMap((clause) => {
    env = clause.env
    for (const name of clause.bindings) {
      env = envExtend(env, name, Values.PatternVar(mod.freshen(name)))
    }

    const value = evaluate(clause.mod, env, clause.exp)
    const goals = clause.goals.map((goal) =>
      evaluateGoalExp(clause.mod, env, goal),
    )

    const newSolution = pursueEqual(mod, solution, value, arg)
    if (newSolution === undefined) return []

    /**

       We append the generated new goals
       to the start of the queue,
       to get depth-first search.

    **/

    return [
      newSolution.update({
        goals: [...goals, ...solution.goals],
      }),
    ]
  })
}
