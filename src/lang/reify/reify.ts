import type { Mod } from "../mod"
import {
  prepareSubstitution,
  reifyInequalities,
  reifyTypeConstraints,
} from "../reify"
import type { Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

/**

   We do not sort the constraints (and the nested constraints in `disj`),
   the order depends on the implementation and the input code,
   just like the order of solutions (which is not sorted).

**/

export function reify(mod: Mod, solution: Solution, value: Value): Value {
  value = substitutionDeepWalk(solution.substitution, value)
  const substitutionForRenaming = prepareSubstitution(value)
  const constraints = [
    ...reifyInequalities(mod, solution, substitutionForRenaming),
    ...reifyTypeConstraints(mod, solution, substitutionForRenaming),
  ]

  if (constraints.length > 0) {
    return Values.WithConstraints(
      substitutionDeepWalk(substitutionForRenaming, value),
      constraints,
    )
  }

  return substitutionDeepWalk(substitutionForRenaming, value)
}
