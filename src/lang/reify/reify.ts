import { type Solution } from "../solution/index.js"
import { substitutionDeepWalk } from "../substitution/index.js"
import * as Values from "../value/index.js"
import { type Value } from "../value/index.js"
import { prepareSubstitution } from "./prepareSubstitution.js"
import { reifyInequalities } from "./reifyInequalities.js"
import { reifyTypeConstraints } from "./reifyTypeConstraints.js"

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
