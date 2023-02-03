import type { Goal } from "../goal"
import { reify } from "../reify"
import { createSolutionFromGoals } from "../solution"
import { solve } from "../solve"
import type { Value } from "../value"

export function find(
  limit: number,
  pattern: Value,
  goals: Array<Goal>,
): Array<Value> {
  const solutions = solve([createSolutionFromGoals(goals)], {
    limit,
  })
  return solutions.map((solution) => reify(solution, pattern))
}
