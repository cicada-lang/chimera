import * as Exps from "../exp"
import { Exp } from "../exp"
import { Solution, SolutionCons, solutionLength, walk } from "../solution"

export function reifySolution(solution: Solution, exp: Exp): Solution {
  exp = walk(solution, exp)

  switch (exp.kind) {
    case "PatternVar": {
      const count = solutionLength(solution)
      const reifiedExp = Exps.String(`_.${count}`)
      return SolutionCons(exp.name, reifiedExp, solution)
    }

    case "ListCons": {
      solution = reifySolution(solution, exp.car)
      solution = reifySolution(solution, exp.cdr)
      return solution
    }

    case "Objekt": {
      for (const property of Object.values(exp.properties)) {
        solution = reifySolution(solution, property)
      }

      return solution
    }

    default: {
      return solution
    }
  }
}
