import type * as Exps from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"

export function evaluateGoal(mod: Mod, goal: Exps.Goal): Goal {
  switch (goal.kind) {
    case "GoalApply": {
      /** NOTE Support mutual recursive relations. **/
      const relation = mod.findOrCreateRelation(goal.name)
      return Goals.Apply(goal.name, relation, goal.arg)
    }

    case "GoalUnifiable": {
      return Goals.Unifiable(goal.left, goal.right)
    }
  }
}
