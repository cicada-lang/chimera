import type { Env } from "../env"
import { evaluate } from "../evaluate"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { pursueEqual, pursueNotEqual } from "../pursue"
import { refreshGoal, refreshValue } from "../refresh"
import type { Solution } from "../solution"

/**

   We append the generated new goals
   to the start of the queue,
   to get depth-first search.

**/

export function pursue(
  mod: Mod,
  env: Env,
  solution: Solution,
  goal: Goal,
): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const varMap = new Map()
        const value = refreshValue(mod, evaluate(mod, env, clause.exp), varMap)
        const goals = clause.goals.map((goal) => refreshGoal(mod, goal, varMap))

        const newSolution = pursueEqual(mod, solution, value, goal.arg)
        if (newSolution === undefined) return []
        return [
          newSolution.update({
            goals: [...goals, ...solution.goals],
          }),
        ]
      })
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
