import { deepWalk, lookupValueInSolution, Solution } from "../solution"
import { formatValue } from "../value"

export function formatSolution(
  solution: Solution,
  names: Array<string>,
): string {
  const properties: Array<string> = []
  for (const name of names) {
    let value = lookupValueInSolution(solution, name)
    if (value === undefined) {
      properties.push(`"${name}": "#unknown"`)
    } else {
      value = deepWalk(solution, value)
      properties.push(`"${name}": ${formatValue(value)}`)
    }
  }

  return `{ ${properties.join(", ")} }`
}
