import { lookupValueInSolution, Solution, walk } from "../solution"
import { Value } from "../value"

export function deepWalk(solution: Solution, value: Value): Value {
  value = walk(solution, value)

  return value
}
