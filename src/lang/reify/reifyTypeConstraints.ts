import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVar,
  substitutionDeepWalk,
} from "../substitution"
import type * as Values from "../value"

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
      !substitutionContainsPatternVar(variable, substitutionForRenaming),
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
