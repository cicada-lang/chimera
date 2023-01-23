import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { reify } from "../reify"
import { Solver } from "../solver"
import type { Value } from "../value"

export function find(
  mod: Mod,
  limit: number,
  pattern: Value,
  goals: Array<Goal>,
): Array<Value> {
  const solver = Solver.start(goals)
  const solutions = solver.solve({ limit })
  return solutions.map((solution) => reify(solution, pattern))
}
