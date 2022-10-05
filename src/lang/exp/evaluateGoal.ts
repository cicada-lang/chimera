import { Env, lookupValueInEnv } from "../env"
import * as Errors from "../errors"
import * as Exps from "../exp"
import * as Goals from "../goal"
import { Goal } from "../goal"
import * as Values from "../value"

export function evaluateGoal(env: Env, goal: Exps.Goal): Goal {
  switch (goal.kind) {
    case "GoalApply": {
      const relation = lookupValueInEnv(env, goal.name)
      if (relation === undefined) {
        throw new Errors.LangError(`Undefined relation name: ${goal.name}`)
      }

      Values.assertRelation(relation)
      return Goals.Apply(goal.name, relation, Exps.evaluate(env, goal.arg))
    }

    case "GoalUnifiable": {
      return Goals.Unifiable(Exps.evaluate(env, goal.left), Exps.evaluate(env, goal.right))
    }
  }
}
