import { Env, lookupValueInEnv } from "../env"
import * as Exps from "../exp"
import * as Goals from "../goal"
import { Goal } from "../goal"
import { Mod } from "../mod"
import * as Values from "../value"

export function evaluateGoal(mod: Mod, env: Env, goal: Exps.Goal): Goal {
  switch (goal.kind) {
    case "GoalApply": {
      /** NOTE Support mutual recursive relations. **/
      const relation =
        lookupValueInEnv(env, goal.name) || mod.findOrCreateRelation(goal.name)
      Values.assertRelation(relation)
      return Goals.Apply(goal.name, relation, Exps.evaluate(env, goal.arg))
    }

    case "GoalUnifiable": {
      return Goals.Unifiable(
        Exps.evaluate(env, goal.left),
        Exps.evaluate(env, goal.right),
      )
    }
  }
}
