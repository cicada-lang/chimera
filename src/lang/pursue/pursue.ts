import type { Goal } from "../goal/index.ts"
import type { Mod } from "../mod/index.ts"
import { pursueEqual, pursueNotEqual } from "../pursue/index.ts"
import { refreshClause } from "../refresh/index.ts"
import type { Solution } from "../solution/index.ts"

export function pursue(
  mod: Mod,
  solution: Solution,
  goal: Goal,
): Array<Solution> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = refreshClause(mod, clause)

        /**

           We append the generated new goals
           to the start of the queue,
           to get depth-first search.

        **/

        const newSolution = pursueEqual(mod, solution, exp, goal.arg)
        return newSolution === undefined
          ? []
          : [newSolution.update({ goals: [...goals, ...solution.goals] })]
      })
    }

    case "Equal": {
      const newSolution = pursueEqual(mod, solution, goal.left, goal.right)
      return newSolution === undefined ? [] : [newSolution]
    }

    case "NotEqual": {
      const newSolution = pursueNotEqual(mod, solution, goal.left, goal.right)
      return newSolution === undefined ? [] : [newSolution]
    }

    case "Conj": {
      return [solution.update({ goals: [...goal.goals, ...solution.goals] })]
    }

    case "Disj": {
      return goal.goals.map((goal) =>
        solution.update({ goals: [goal, ...solution.goals] }),
      )
    }
  }
}
