import type { Env } from "../env"
import * as Errors from "../errors"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { applyRelation, pursueEqual, pursueNotEqual } from "../pursue"
import type { Solution } from "../solution"
import { substitutionWalk } from "../substitution"

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
        const arg = substitutionWalk(solution.substitution, goal.arg)
        if (arg["@kind"] === "PatternVar") {
          //
        }

        if (goal.target.predicate(arg)) {
          return [solution]
        } else {
          return []
        }
      }

      throw new Errors.LangError(
        [
          `[pursue] can not apply goal.target`,
          `  goal.target["@kind"]: ${goal.target["@kind"]}`,
        ].join("\n"),
      )
    }

    case "Equal": {
      const newSolution = pursueEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []

      return [
        newSolution.update({
          goals: [...solution.goals],
        }),
      ]
    }

    case "NotEqual": {
      const newSolution = pursueNotEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []

      return [
        newSolution.update({
          goals: [...solution.goals],
        }),
      ]
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
