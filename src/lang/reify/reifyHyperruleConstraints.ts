import type { Goal } from "../goal"
import * as Goals from "../goal"
import { HyperruleConstraint, Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVarInValue,
  substitutionDeepWalk,
} from "../substitution"

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

  hyperruleConstraints = hyperruleConstraints.map((hyperruleConstraint) =>
    HyperruleConstraint(
      hyperruleConstraint.target,
      hyperruleConstraint.values.filter(
        (value) =>
          !substitutionContainsPatternVarInValue(
            substitutionForRenaming,
            value,
          ),
      ),
    ),
  )

  return hyperruleConstraints.flatMap((hyperruleConstraint) =>
    hyperruleConstraintAsGoals(hyperruleConstraint, substitutionForRenaming),
  )
}

function hyperruleConstraintAsGoals(
  hyperruleConstraint: HyperruleConstraint,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  return hyperruleConstraint.values.map((value) =>
    Goals.Apply(hyperruleConstraint.target, [
      substitutionDeepWalk(substitutionForRenaming, value),
    ]),
  )
}
