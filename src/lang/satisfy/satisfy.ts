import type { Goal } from "../goal"
import { Solver } from "../solver"

export function satisfy(goal: Goal): boolean {
  const solver = Solver.start([goal])
  const solutions = solver.solve({ limit: Infinity })
  return solutions.length !== 0
}
