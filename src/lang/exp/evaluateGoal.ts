import * as Errors from "../errors"
import type * as Exps from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"

export function evaluateGoal(mod: Mod, goal: Exps.Goal): Goal {
  switch (goal["@kind"]) {
    case "GoalApply": {
      const relation = mod.findRelation(goal.name)
      if (relation === undefined) {
        throw new Errors.ElaborationError(
          `[evaluateGoal] undefined relation name: ${goal.name}`,
          { span: goal.span },
        )
      }

      return Goals.Apply(goal.name, relation, goal.arg)
    }

    case "GoalUnifiable": {
      return Goals.Unifiable(goal.left, goal.right)
    }
  }
}
