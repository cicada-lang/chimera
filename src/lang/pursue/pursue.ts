import * as Actions from "../actions"
import * as Errors from "../errors"
import type { Goal } from "../goal"
import type { Solution } from "../solution"
import * as Values from "../value"
import { applyRelation } from "./applyRelation"
import { applyTypeConstraint } from "./applyTypeConstraint"
import { pursueEqual } from "./pursueEqual"
import { pursueNotEqual } from "./pursueNotEqual"

function unit(solution: Solution | undefined): Array<Solution> {
  if (solution === undefined) return []
  return [solution]
}

export function pursue(solution: Solution, goal: Goal): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      if (goal.target["@kind"] === "Relation") {
        return applyRelation(solution, goal.target, goal.args)
      }

      if (goal.target["@kind"] === "TypeConstraint") {
        return applyTypeConstraint(solution, goal.target, goal.args[0])
      }

      if (goal.target["@kind"] === "Primitive") {
        const value = Actions.doAp(goal.target, goal.args)
        Values.assertValue(value, "Goal", { who: "pursue" })
        return pursue(solution, value.goal)
      }

      throw new Errors.LangError(
        [
          `[pursue] can not apply goal.target`,
          `  goal.target["@kind"]: ${goal.target["@kind"]}`,
        ].join("\n"),
      )
    }

    case "Equal": {
      return unit(pursueEqual(solution, goal.left, goal.right))
    }

    case "NotEqual": {
      return unit(pursueNotEqual(solution, goal.left, goal.right))
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
