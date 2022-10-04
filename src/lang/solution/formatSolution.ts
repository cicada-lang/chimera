import { deepWalk, lookupValueInSolution, Solution } from "../solution"
import { formatValue } from "../value"

export function formatSolution(solution: Solution, names: Array<string>): string {
  const properties = names.map((name) => formatProperty(solution, name))
  return `{ ${properties.join(", ")} }`
}

function formatProperty(solution: Solution, name: string): string {
  let value = lookupValueInSolution(solution, name)
  if (value === undefined) {
    return `"${name}": "?${name}"`
  } else {
    value = deepWalk(solution, value)
    return `"${name}": ${formatValue(value)}`
  }
}

export function formatSolutions(solutions: Array<Solution>, names: Array<string>): string {
  return solutions.map((solution) => formatSolution(solution, names)).join(", ")
}
