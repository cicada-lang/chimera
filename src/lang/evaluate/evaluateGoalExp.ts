import { type Env } from "../env/index.js"
import { evaluate } from "../evaluate/index.js"
import { type GoalExp } from "../goal-exp/index.js"
import * as Goals from "../goal/index.js"
import { type Goal } from "../goal/index.js"
import { type Mod } from "../mod/index.js"
import { quote } from "../quote/index.js"

export function evaluateGoalExp(mod: Mod, env: Env, goal: GoalExp): Goal {
  switch (goal["@kind"]) {
    case "Apply": {
      return Goals.Apply(
        evaluate(mod, env, goal.target),
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
