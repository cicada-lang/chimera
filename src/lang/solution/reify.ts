import type { Exp } from "../exp"
import { deepWalk, Solution, SolutionNull, solutionReify } from "../solution"

export function reify(solution: Solution, exp: Exp): Exp {
  exp = deepWalk(solution, exp)
  solution = solutionReify(SolutionNull(), exp)
  return deepWalk(solution, exp)
}
