import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Solution, SolutionCons, solutionLength, walk } from "../solution"

export function reifySolution(solution: Solution, exp: Exp): Solution {
  exp = walk(solution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      const count = solutionLength(solution)
      const reifiedExp = Exps.ReifiedVar(count.toString())
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
