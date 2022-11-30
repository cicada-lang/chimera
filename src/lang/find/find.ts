import { buildSolveOptions, FindOption } from "../find"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import type { Solution } from "../solution"
import { Solver } from "../solver"

export function find(
  mod: Mod,
  options: Array<FindOption>,
  goals: Array<Goal>,
): Array<Solution> {
  const solver = Solver.start(goals)
  const solutions = solver.solve(mod, buildSolveOptions(options))
  return solutions
}
