import * as Actions from "../actions/index.ts"
import * as Errors from "../errors/index.ts"
import type { Goal } from "../goal/index.ts"
import { solutionUpdate, type Solution } from "../solution/index.ts"
import * as Values from "../value/index.ts"
import { applyEqual } from "./applyEqual.ts"
import { applyNotEqual } from "./applyNotEqual.ts"
import { pursueRelation } from "./pursueRelation.ts"
import { pursueTypeConstraint } from "./pursueTypeConstraint.ts"

function unit(solution: Solution | undefined): Array<Solution> {
  if (solution === undefined) return []
  return [solution]
}

export function pursue(solution: Solution, goal: Goal): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      if (goal.target["@kind"] === "Relation") {
        return pursueRelation(solution, goal.target, goal.args)
      }

      if (goal.target["@kind"] === "TypeConstraint") {
        return pursueTypeConstraint(solution, goal.target, goal.args[0])
      }

      if (goal.target["@kind"] === "Primitive") {
        const value = Actions.doAp(goal.target, goal.args)
        Values.assertValue(value, "Goal", { who: "pursue" })
        return pursue(solution, value.goal)
      }

      if (goal.target["@kind"] === "Fn") {
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
      return unit(applyEqual(solution, goal.left, goal.right))
    }

    case "NotEqual": {
      return unit(applyNotEqual(solution, goal.left, goal.right))
    }

    case "Conj": {
      return [
        solutionUpdate(solution, {
          goals: [...goal.goals, ...solution.goals],
        }),
      ]
    }

    case "Disj": {
      return goal.goals.map((goal) =>
        solutionUpdate(solution, {
          goals: [goal, ...solution.goals],
        }),
      )
    }
  }
}
