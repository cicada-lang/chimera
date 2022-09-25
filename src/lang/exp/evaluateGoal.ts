import { Env } from "../env"
import * as Exps from "../exp"
import * as Goals from "../goal"
import { Goal } from "../goal"

export function evaluateGoal(env: Env, goal: Exps.Goal): Goal {
  switch (goal.kind) {
    case "Apply": {
      return Goals.Apply(goal.name, goal.exp)
    }

    case "Unifiable": {
      return Goals.Unifiable(goal.left, goal.right)
    }
  }
}
