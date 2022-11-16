import type { Exp } from "../exp"
import { Solution } from "../solution"

export function lookupSolution(
  solution: Solution,
  name: string,
): Exp | undefined {
  while (solution.kind !== "SolutionNull") {
    if (solution.name === name) {
      return solution.exp
    } else {
      solution = solution.rest
    }
  }
}
