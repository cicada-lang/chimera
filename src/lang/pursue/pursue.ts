import type { Env } from "../env"
import * as Errors from "../errors"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import {
  applyRelation,
  applyTypeConstraint,
  pursueEqual,
  pursueNotEqual,
} from "../pursue"
import type { Solution } from "../solution"

export function pursue(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      if (goal.target["@kind"] === "Relation") {
        return applyRelation(mod, env, solution, goal.target, goal.arg)
      }

      if (goal.target["@kind"] === "TypeConstraint") {
        return applyTypeConstraint(mod, env, solution, goal.target, goal.arg)
      }

      throw new Errors.LangError(
        [
          `[pursue] can not apply goal.target`,
          `  goal.target["@kind"]: ${goal.target["@kind"]}`,
        ].join("\n"),
      )
    }

    case "Equal": {
      return pursueEqual(mod, solution, goal.left, goal.right)
    }

    case "NotEqual": {
      return pursueNotEqual(mod, solution, goal.left, goal.right)
    }

    case "Conj": {
      return [
        solution.update({
          goals: [...goal.goals, ...solution.goals],
        }),
      ]
    }

    case "Disj": {
      return goal.goals.map((goal) =>
        solution.update({
          goals: [goal, ...solution.goals],
        }),
      )
    }
  }
}
