import { Solution, SolutionCons, solutionLength, walk } from "../solution"
import * as Values from "../value"
import { Value } from "../value"

export function reifySolution(solution: Solution, value: Value): Solution {
  value = walk(solution, value)

  switch (value.kind) {
    case "PatternVar": {
      const count = solutionLength(solution)
      const reifiedValue = Values.String(`_.${count}`)
      return SolutionCons(value.name, reifiedValue, solution)
    }

    case "ListCons": {
      solution = reifySolution(solution, value.car)
      solution = reifySolution(solution, value.cdr)
      return solution
    }

    case "Objekt": {
      for (const property of Object.values(value.properties)) {
        solution = reifySolution(solution, property)
      }

      return solution
    }

    default: {
      return solution
    }
  }
}
