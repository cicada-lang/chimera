import { HyperruleConstraint, Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"

export function hyperruleConstraintDeepWalk(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint {
  return HyperruleConstraint(
    hyperruleConstraint.target,
    hyperruleConstraint.values.map((value) =>
      substitutionDeepWalk(solution.substitution, value),
    ),
  )
}
