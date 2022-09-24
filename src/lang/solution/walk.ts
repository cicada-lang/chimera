import { lookupValueInSolution, Solution } from "../solution"
import { Value } from "../value"

export function walk(solution: Solution, value: Value): Value {
  while (value.kind === "Var") {
    const found = lookupValueInSolution(solution, value.name)
    if (found === undefined) return value
    value = found
  }

  return value
}
