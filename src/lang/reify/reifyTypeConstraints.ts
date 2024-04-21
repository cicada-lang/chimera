import * as Goals from "../goal/index.js"
import { type Goal } from "../goal/index.js"
import { type Solution } from "../solution/index.js"
import {
  substitutionContainsPatternVarInValue,
  substitutionDeepWalk,
  type Substitution,
} from "../substitution/index.js"
import type * as Values from "../value/index.js"

export function reifyTypeConstraints(
  solution: Solution,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  let typeConstraints = solution.typeConstraints

  /**

     If a `typeConstraint` contains a fresh variable,
     then we may discard this constraint.

     This is because for a fresh variable,
     we can always pick something for this fresh variable that
     satisfy this `typeConstraint`.

  **/

  typeConstraints = typeConstraints.filter(
    ([variable, _typeConstraint]) =>
      !substitutionContainsPatternVarInValue(substitutionForRenaming, variable),
  )

  return typeConstraints.map(([variable, typeConstraint]) =>
    typeConstraintAsGoal(variable, typeConstraint, substitutionForRenaming),
  )
}

function typeConstraintAsGoal(
  variable: Values.PatternVar,
  typeConstraint: Values.TypeConstraint,
  substitutionForRenaming: Substitution,
): Goal {
  return Goals.Apply(typeConstraint, [
    substitutionDeepWalk(substitutionForRenaming, variable),
  ])
}
