import type { Exp } from "../exp"
import * as Exps from "../exp"
import { Substitution, substitutionWalk } from "../substitution"

export function substitutionDeepWalk(
  substitution: Substitution,
  exp: Exp,
): Exp {
  exp = substitutionWalk(substitution, exp)

  switch (exp["@kind"]) {
    case "ArrayCons": {
      return Exps.ArrayCons(
        substitutionDeepWalk(substitution, exp.car),
        substitutionDeepWalk(substitution, exp.cdr),
      )
    }

    case "Objekt": {
      return Exps.Objekt(
        Object.fromEntries(
          Object.entries(exp.properties).map(([name, property]) => [
            name,
            substitutionDeepWalk(substitution, property),
          ]),
        ),
      )
    }

    case "Data": {
      return Exps.Data(
        exp.type,
        exp.kind,
        exp.args.map((arg) => substitutionDeepWalk(substitution, arg)),
      )
    }

    default: {
      return exp
    }
  }
}
