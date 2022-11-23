import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Solution, solutionWalk } from "../solution"

export function solutionDeepWalk(solution: Solution, exp: Exp): Exp {
  exp = solutionWalk(solution, exp)

  switch (exp["@kind"]) {
    case "ArrayCons": {
      return Exps.ArrayCons(
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

    case "Data": {
      return Exps.Data(
        exp.type,
        exp.kind,
        exp.args.map((arg) => solutionDeepWalk(solution, arg)),
      )
    }

    default: {
      return exp
    }
  }
}
