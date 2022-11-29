import type { GoalExp } from "."
import * as Errors from "../errors"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"

export function evaluateGoalExp(mod: Mod, goal: GoalExp): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      const relation = mod.findRelation(goal.name)
      if (relation === undefined) {
        throw new Errors.ElaborationError(
          `[evaluateGoal] undefined relation name: ${goal.name}`,
          { span: goal.span },
        )
      }

      return Goals.Apply(goal.name, relation, goal.arg)
    }

    case "Equal": {
      return Goals.Equal(goal.left, goal.right)
    }

    case "NotEqual": {
      return Goals.NotEqual(goal.left, goal.right)
    }

    case "Conj": {
      return Goals.Conj(goal.goals.map((goal) => evaluateGoalExp(mod, goal)))
    }

    case "Disj": {
      return Goals.Disj(goal.goals.map((goal) => evaluateGoalExp(mod, goal)))
    }
  }
}
