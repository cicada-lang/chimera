import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVar,
  substitutionDeepWalk,
} from "../substitution"

export function reifyTypeConstraints(
  mod: Mod,
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
    Goals.Apply(
      typeConstraint.name,
      typeConstraint,
      substitutionDeepWalk(substitutionForRenaming, variable),
    ),
  )
}
