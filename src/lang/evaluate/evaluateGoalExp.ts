import type { Env } from "../env"
import * as Errors from "../errors"
import { evaluate } from "../evaluate"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"

export function evaluateGoalExp(mod: Mod, env: Env, goal: GoalExp): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      const target = mod.find(goal.name)
      if (target === undefined) {
        throw new Errors.ElaborationError(
          `[evaluateGoal] Apply fail, undefined target name: ${goal.name}`,
          { span: goal.span },
        )
      }

      return Goals.Apply(
        goal.name,
        target,
        goal.args.map((arg) => evaluate(mod, env, arg)),
      )
    }

    case "Equal": {
      return Goals.Equal(
        evaluate(mod, env, goal.left),
        evaluate(mod, env, goal.right),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        evaluate(mod, env, goal.left),
        evaluate(mod, env, goal.right),
      )
    }

    case "Conj": {
      return Goals.Conj(
        goal.goals.map((goal) => evaluateGoalExp(mod, env, goal)),
      )
    }

    case "Disj": {
      return Goals.Disj(
        goal.goals.map((goal) => evaluateGoalExp(mod, env, goal)),
      )
    }
  }
}
