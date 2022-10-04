import { deepWalk, lookupValueInSolution, Solution } from "../solution"
import { formatValue } from "../value"

export function formatSolution(solution: Solution, names: Array<string>): string {
  const values = names.map((name) => formatVariable(solution, name))
  return `[${values.join(", ")}]`
}

function formatVariable(solution: Solution, name: string): string {
  let value = lookupValueInSolution(solution, name)
  if (value === undefined) {
    return `"?${name}"`
  } else {
    value = deepWalk(solution, value)
    return `${formatValue(value)}`
  }
}

export function formatSolutions(solutions: Array<Solution>, names: Array<string>): string {
  return solutions.map((solution) => formatSolution(solution, names)).join(", ")
}
