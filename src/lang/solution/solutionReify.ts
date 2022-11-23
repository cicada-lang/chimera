import type { Exp } from "../exp"
import * as Exps from "../exp"
import {
  Solution,
  SolutionCons,
  solutionLength,
  solutionWalk,
} from "../solution"

export function solutionReify(solution: Solution, exp: Exp): Solution {
  exp = solutionWalk(solution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      const count = solutionLength(solution)
      const reifiedExp = Exps.ReifiedVar(count.toString())
      return SolutionCons(exp.name, reifiedExp, solution)
    }

    case "ArrayCons": {
      solution = solutionReify(solution, exp.car)
      solution = solutionReify(solution, exp.cdr)
      return solution
    }

    case "Objekt": {
      for (const property of Object.values(exp.properties)) {
        solution = solutionReify(solution, property)
      }

      return solution
    }

    case "Data": {
      for (const arg of exp.args) {
        solution = solutionReify(solution, arg)
      }

      return solution
    }

    default: {
      return solution
    }
  }
}
