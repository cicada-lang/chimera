import type { Goal } from "../goal/index.js"
import { reify } from "../reify/index.js"
import { createSolutionFromGoals } from "../solution/index.js"
import { solve } from "../solve/index.js"
import type { Value } from "../value/index.js"

export function find(
  limit: number,
  pattern: Value,
  goals: Array<Goal>,
): Array<Value> {
  const solutions = solve(createSolutionFromGoals(goals), {
    limit,
  })
  return solutions.map((solution) => reify(solution, pattern))
}
