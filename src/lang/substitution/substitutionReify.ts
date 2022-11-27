import type { Exp } from "../exp"
import * as Exps from "../exp"
import {
  Substitution,
  substitutionExtend,
  substitutionLength,
  substitutionWalk,
} from "../substitution"

export function substitutionReify(
  substitution: Substitution,
  exp: Exp,
): Substitution {
  exp = substitutionWalk(substitution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      const count = substitutionLength(substitution)
      const reifiedExp = Exps.ReifiedVar(count.toString())
      return substitutionExtend(substitution, exp.name, reifiedExp)
    }

    case "ArrayCons": {
      substitution = substitutionReify(substitution, exp.car)
      substitution = substitutionReify(substitution, exp.cdr)
      return substitution
    }

    case "Objekt": {
      for (const property of Object.values(exp.properties)) {
        substitution = substitutionReify(substitution, property)
      }

      return substitution
    }

    case "Data": {
      for (const arg of exp.args) {
        substitution = substitutionReify(substitution, arg)
      }

      return substitution
    }

    default: {
      return substitution
    }
  }
}
