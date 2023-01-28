import { evaluateGoalExp } from "../evaluate"
import { quote } from "../quote"
import { refreshGoals, refreshValues } from "../refresh"
import { Solution, solutionUpdate } from "../solution"
import type * as Values from "../value"
import type { Value } from "../value"
import { applyEqual } from "./applyEqual"

export function pursueRelation(
  solution: Solution,
  target: Values.Relation,
  args: Array<Value>,
): Array<Solution> {
  return target.clauses.flatMap((clause) => {
    /**

       If the arity is not the same, do not use the clause.

    **/

    if (clause.patterns.length !== args.length) {
      return []
    }

    const renames = new Map()

    const values = refreshValues(
      renames,
      clause.patterns.map((pattern) =>
        quote(clause.mod, clause.mod.env, pattern),
      ),
    )
    const newSolution = pursueManyEqual(solution, values, args)

    /**

       We append the generated new goals
       to the start of the queue,
       to get depth-first search.

    **/

    if (newSolution === undefined) {
      return []
    }

    const goals = refreshGoals(
      renames,
      clause.goals.map((goal) =>
        evaluateGoalExp(clause.mod, clause.mod.env, goal),
      ),
    )

    return [
      solutionUpdate(newSolution, {
        goals: [...goals, ...solution.goals],
      }),
    ]
  })
}

function pursueManyEqual(
  solution: Solution | undefined,
  values: Array<Value>,
  args: Array<Value>,
): Solution | undefined {
  for (const [index, value] of values.entries()) {
    if (solution === undefined) return undefined
    solution = applyEqual(solution, value, args[index])
  }

  return solution
}
