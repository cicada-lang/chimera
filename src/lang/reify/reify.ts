import { type Solution } from "../solution/index.ts"
import { substitutionDeepWalk } from "../substitution/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"
import { prepareSubstitution } from "./prepareSubstitution.ts"
import { reifyInequalities } from "./reifyInequalities.ts"
import { reifyTypeConstraints } from "./reifyTypeConstraints.ts"

/**

   We do not sort the constraints (and the nested constraints in `disj`),
   the order depends on the implementation and the input code,
   just like the order of solutions (which is not sorted).

**/

export function reify(solution: Solution, value: Value): Value {
  value = substitutionDeepWalk(solution.substitution, value)
  const substitutionForRenaming = prepareSubstitution(value)
  const constraints = [
    ...reifyInequalities(solution, substitutionForRenaming),
    ...reifyTypeConstraints(solution, substitutionForRenaming),
  ]

  if (constraints.length > 0) {
    return Values.WithConstraints(
      substitutionDeepWalk(substitutionForRenaming, value),
      constraints,
    )
  }

  return substitutionDeepWalk(substitutionForRenaming, value)
}
