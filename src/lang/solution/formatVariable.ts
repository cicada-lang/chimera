import { deepWalk, lookupValueInSolution, Solution } from "../solution"
import { formatValue } from "../value"

export function formatVariable(solution: Solution, name: string): string {
  let value = lookupValueInSolution(solution, name)
  if (value === undefined) {
    return `"?${name}"`
  } else {
    value = deepWalk(solution, value)
    return `${formatValue(value)}`
  }
}
