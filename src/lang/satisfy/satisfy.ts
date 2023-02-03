import type { Goal } from "../goal"
import { createSolutionFromGoals } from "../solution"
import { solve } from "../solve"

export function satisfy(goal: Goal): boolean {
  const solutions = solve([createSolutionFromGoals([goal])], {
    limit: Infinity,
  })
  return solutions.length !== 0
}
