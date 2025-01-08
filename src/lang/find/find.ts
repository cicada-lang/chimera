import type { Goal } from "../goal/index.ts"
import { reify } from "../reify/index.ts"
import { createSolutionFromGoals } from "../solution/index.ts"
import { solve } from "../solve/index.ts"
import type { Value } from "../value/index.ts"

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
