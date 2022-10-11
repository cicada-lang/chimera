import { deepWalk, lookupValueInSolution, reify, Solution } from "../solution"
import * as Values from "../value"
import { formatValue } from "../value"

export function formatVariable2(solution: Solution, name: string): string {
  let value = lookupValueInSolution(solution, name)
  if (value === undefined) {
    return `"?${name}"`
  } else {
    value = deepWalk(solution, value)
    return `${formatValue(value)}`
  }
}

export function formatVariable(solution: Solution, name: string): string {
  const value = lookupValueInSolution(solution, name) || Values.PatternVar(name)
  return formatValue(reify(solution, value))
}
