import type { Env } from "../env"
import * as Errors from "../errors"
import { quote } from "../evaluate"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"

export function evaluateGoalExp(mod: Mod, env: Env, goal: GoalExp): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      const target = mod.find(goal.name)
      if (target === undefined) {
        throw new Errors.LangError(
          `[evaluateGoal] Apply fail, undefined target name: ${goal.name}`,
          { span: goal.span },
        )
      }

      return Goals.Apply(
        goal.name,
        target,
        goal.args.map((arg) => quote(mod, env, arg)),
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
