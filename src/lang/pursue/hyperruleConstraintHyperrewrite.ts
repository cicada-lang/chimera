import { hyperrewrite } from "../hyperrewrite"
import { HyperruleConstraint, Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"

export function hyperruleConstraintHyperrewrite(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint | undefined {
  hyperruleConstraint = hyperruleConstraintDeepWalk(
    solution,
    hyperruleConstraint,
  )

  const values = hyperrewrite(
    hyperruleConstraint.target.hyperrule,
    hyperruleConstraint.values,
  )

  if (values === false) {
    return undefined
  }

  return HyperruleConstraint(hyperruleConstraint.target, values)
}

function hyperruleConstraintDeepWalk(
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
