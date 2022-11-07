import { Exp } from "../exp"
import { deepWalk, reifySolution, Solution, SolutionNull } from "../solution"

export function reify(solution: Solution, exp: Exp): Exp {
  exp = deepWalk(solution, exp)
  solution = reifySolution(SolutionNull(), exp)
  return deepWalk(solution, exp)
}
