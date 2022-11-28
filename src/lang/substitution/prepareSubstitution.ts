import type { Exp } from "../exp"
import * as Exps from "../exp"
import {
  Substitution,
  substitutionExtend,
  substitutionLength,
  substitutionWalk,
} from "../substitution"

/**
   move prepareSubstitution
   Prepare a substitution for the reification of an `exp`.

   Given an `exp`, build a mapping from all variable names in the
   `exp` to `ReifiedVar`.  A `ReifiedVar` has a `count` the occurrence
   of variable names during depth-first traversal of the `exp`.

**/

export function prepareSubstitution(
  substitution: Substitution,
  exp: Exp,
): Substitution {
  exp = substitutionWalk(substitution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      const count = substitutionLength(substitution)
      const reifiedVar = Exps.ReifiedVar(count)
      return substitutionExtend(substitution, exp.name, reifiedVar)
    }

    case "ArrayCons": {
      substitution = prepareSubstitution(substitution, exp.car)
      substitution = prepareSubstitution(substitution, exp.cdr)
      return substitution
    }

    case "Objekt": {
      for (const property of Object.values(exp.properties)) {
        substitution = prepareSubstitution(substitution, property)
      }

      return substitution
    }

    case "Data": {
      for (const arg of exp.args) {
        substitution = prepareSubstitution(substitution, arg)
      }

      return substitution
    }

    default: {
      return substitution
    }
  }
}
