import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Solution, solutionWalk } from "../solution"

export function deepWalk(solution: Solution, exp: Exp): Exp {
  exp = solutionWalk(solution, exp)

  switch (exp["@kind"]) {
    case "ListCons": {
      return Exps.ListCons(
        deepWalk(solution, exp.car),
        deepWalk(solution, exp.cdr),
      )
    }

    case "Objekt": {
      return Exps.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            deepWalk(solution, property),
          ]),
        ),
      )
    }

    default: {
      return exp
    }
  }
}
