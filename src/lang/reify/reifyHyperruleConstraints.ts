import type { Goal } from "../goal"
import type { Solution } from "../solution"
import type { Substitution } from "../substitution"

export function reifyHyperruleConstraints(
  solution: Solution,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  let hyperruleConstraints = solution.hyperruleConstraints

  /**

     If a constraint contains a fresh variable,
     then we may discard this constraint.

     This is because for a fresh variable,
     we can always pick something for this fresh variable that
     satisfy this constraint.

  **/

  // hyperruleConstraints = hyperruleConstraints.filter(
  //   ([variable, _typeConstraint]) =>
  //     !substitutionContainsPatternVar(variable, substitutionForRenaming),
  // )

  return []

  // typeConstraints.map(([variable, typeConstraint]) =>
  //   typeConstraintAsGoal(variable, typeConstraint, substitutionForRenaming),
  // )
}

// function typeConstraintAsGoal(
//   variable: Values.PatternVar,
//   typeConstraint: Values.TypeConstraint,
//   substitutionForRenaming: Substitution,
// ): Goal {
//   return Goals.Apply(typeConstraint, [
//     substitutionDeepWalk(substitutionForRenaming, variable),
//   ])
// }
