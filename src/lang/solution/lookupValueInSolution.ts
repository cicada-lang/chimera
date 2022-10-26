import { Solution } from "../solution"
import { Value } from "../value"

export function lookupValueInSolution(
  solution: Solution,
  name: string,
): Value | undefined {
  while (solution.kind !== "SolutionNull") {
    if (solution.name === name) {
      return solution.value
    } else {
      solution = solution.rest
    }
  }
}
