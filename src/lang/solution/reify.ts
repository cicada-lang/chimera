import { deepWalk, reifySolution, Solution, SolutionNull } from "../solution"
import { Value } from "../value"

export function reify(solution: Solution, value: Value): Value {
  value = deepWalk(solution, value)
  solution = reifySolution(SolutionNull(), value)
  return deepWalk(solution, value)
}
