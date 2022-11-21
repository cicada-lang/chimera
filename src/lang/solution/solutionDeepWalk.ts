import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Solution, solutionWalk } from "../solution"

export function solutionDeepWalk(solution: Solution, exp: Exp): Exp {
  exp = solutionWalk(solution, exp)

  switch (exp["@kind"]) {
    case "ListCons": {
      return Exps.ListCons(
        solutionDeepWalk(solution, exp.car),
        solutionDeepWalk(solution, exp.cdr),
      )
    }

    case "Objekt": {
      return Exps.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            solutionDeepWalk(solution, property),
          ]),
        ),
      )
    }

    default: {
      return exp
    }
  }
}
