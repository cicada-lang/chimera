import type { Exp } from "../exp"
import * as Exps from "../exp"
import {
  Substitution,
  substitutionEmpty,
  substitutionExtend,
  substitutionLength,
  substitutionWalk,
} from "../substitution"

/**

   Prepare a substitution for the reification of an `exp`.

   Given an `exp`, build a mapping from all variable names in the
   `exp` to `ReifiedVar`.  A `ReifiedVar` has a `count` the occurrence
   of variable names during depth-first traversal of the `exp`.

**/

export function prepareSubstitution(
  exp: Exp,
  substitution: Substitution = substitutionEmpty(),
): Substitution {
  exp = substitutionWalk(substitution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      const count = substitutionLength(substitution)
      const reifiedVar = Exps.ReifiedVar(count)
      return substitutionExtend(substitution, exp.name, reifiedVar)
    }

    case "ArrayCons": {
      substitution = prepareSubstitution(exp.car, substitution)
      substitution = prepareSubstitution(exp.cdr, substitution)
      return substitution
    }

    case "Objekt": {
      for (const property of Object.values(exp.properties)) {
        substitution = prepareSubstitution(property, substitution)
      }

      return substitution
    }

    case "Data": {
      for (const arg of exp.args) {
        substitution = prepareSubstitution(arg, substitution)
      }

      return substitution
    }

    default: {
      return substitution
    }
  }
}
