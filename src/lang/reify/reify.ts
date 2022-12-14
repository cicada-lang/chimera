import type { Goal } from "../goal"
import type { Mod } from "../mod"
import {
  prepareSubstitution,
  reifyInequalities,
  reifyTypeConstraints,
} from "../reify"
import type { Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type { Value } from "../value"

/**

   The `Reification` of an `value` is the reified value,
   with a list of constraints represented as goals.

 **/

export type Reification = {
  value: Value
  constraints: Array<Goal>
}

export function Reification(
  value: Value,
  constraints: Array<Goal>,
): Reification {
  return { value, constraints }
}

/**

   We do not sort the constraints (and the nested constraints in `disj`),
   the order depends on the implementation and the input code,
   just like the order of solutions (which is not sorted).

**/

export function reify(mod: Mod, solution: Solution, value: Value): Reification {
  value = substitutionDeepWalk(solution.substitution, value)
  const substitutionForRenaming = prepareSubstitution(value)
  return Reification(substitutionDeepWalk(substitutionForRenaming, value), [
    ...reifyInequalities(mod, solution, substitutionForRenaming),
    ...reifyTypeConstraints(mod, solution, substitutionForRenaming),
  ])
}
