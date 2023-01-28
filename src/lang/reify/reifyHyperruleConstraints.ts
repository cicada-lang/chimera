import type { Goal } from "../goal"
import * as Goals from "../goal"
import { HyperruleConstraint, Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVar,
  substitutionDeepWalk,
} from "../substitution"
import * as Values from "../value"

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
      hyperruleConstraint.hyperrule,
      hyperruleConstraint.values.filter(
        (value) =>
          !substitutionContainsPatternVar(value, substitutionForRenaming),
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
    Goals.Apply(Values.Hyperrule(hyperruleConstraint.hyperrule), [
      substitutionDeepWalk(substitutionForRenaming, value),
    ]),
  )
}
