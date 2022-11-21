import type { Exp } from "../exp"
import {
  Solution,
  solutionDeepWalk,
  SolutionNull,
  solutionReify,
} from "../solution"

export function reify(solution: Solution, exp: Exp): Exp {
  exp = solutionDeepWalk(solution, exp)
  solution = solutionReify(SolutionNull(), exp)
  return solutionDeepWalk(solution, exp)
}
