import {
  Substitution,
  substitutionEmpty,
  substitutionExtend,
  substitutionLength,
  substitutionWalk,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

/**

   Prepare a substitution for the reification of an `value`.

   Given an `value`, build a mapping from all variable names in the
   `value` to `ReifiedVar`.  A `ReifiedVar` has a `count` the occurrence
   of variable names during depth-first traversal of the `value`.

**/

export function prepareSubstitution(
  value: Value,
  substitution: Substitution = substitutionEmpty(),
): Substitution {
  value = substitutionWalk(substitution, value)

  switch (value["@kind"]) {
    case "PatternVar": {
      const count = substitutionLength(substitution)
      const reifiedVar = Values.ReifiedVar(count)
      return substitutionExtend(substitution, value.name, reifiedVar)
    }

    case "ArrayCons": {
      substitution = prepareSubstitution(value.car, substitution)
      substitution = prepareSubstitution(value.cdr, substitution)
      return substitution
    }

    case "Objekt": {
      for (const property of Object.values(value.properties)) {
        substitution = prepareSubstitution(property, substitution)
      }

      if (value.etc) {
        substitution = prepareSubstitution(value.etc, substitution)
      }

      return substitution
    }

    case "Data": {
      for (const arg of value.args) {
        substitution = prepareSubstitution(arg, substitution)
      }

      return substitution
    }

    default: {
      return substitution
    }
  }
}
