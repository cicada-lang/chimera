import type { Env } from "../env"
import * as Errors from "../errors"
import { quote } from "../evaluate"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"

export function evaluateGoalExp(mod: Mod, env: Env, goal: GoalExp): Goal {
  switch (goal["@kind"]) {
    case "Term": {
      const target = mod.find(goal.name)
      if (target === undefined) {
        throw new Errors.LangError(
          [
            `[evaluateGoal Term] undefined term`,
            // `  prefix: ${goal.prefix.join(", ")}`,
            `  name: ${goal.name}`,
          ].join("\n"),
          { span: goal.span },
        )
      }

      return Goals.Term(
        goal.name,
        target,
        goal.args.map((arg) => quote(mod, env, arg)),
      )
    }

    case "Equal": {
      return Goals.Equal(
        quote(mod, env, goal.left),
        quote(mod, env, goal.right),
      )
    }

    case "NotEqual": {
      return Goals.NotEqual(
        quote(mod, env, goal.left),
        quote(mod, env, goal.right),
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
