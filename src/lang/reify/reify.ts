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

export function reify(
  mod: Mod,
  solution: Solution,
  value: Value,
): Values.WithConstraints {
  value = substitutionDeepWalk(solution.substitution, value)
  const substitutionForRenaming = prepareSubstitution(value)
  return Values.WithConstraints(
    substitutionDeepWalk(substitutionForRenaming, value),
    [
      ...reifyInequalities(mod, solution, substitutionForRenaming),
      ...reifyTypeConstraints(mod, solution, substitutionForRenaming),
    ],
  )
}
