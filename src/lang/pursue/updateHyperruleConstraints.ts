import { arrayReplace } from "src/utils/arrayReplace"
import type { Hyperrule } from "../hyperrule"
import { HyperruleConstraint, Solution } from "../solution"
import type { Value } from "../value"

export function updateHyperruleConstraints(
  solution: Solution,
  hyperruleConstraints: Array<HyperruleConstraint>,
  hyperrule: Hyperrule,
  value: Value,
): Array<HyperruleConstraint> {
  const index = hyperruleConstraints.findIndex(
    (hyperruleConstraint) => hyperruleConstraint.hyperrule === hyperrule,
  )

  if (index === -1) {
    return [...hyperruleConstraints, HyperruleConstraint(hyperrule, [value])]
  }

  let hyperruleConstraint = hyperruleConstraints[index]

  hyperruleConstraint = hyperruleConstraintDeepWalk(
    solution,
    hyperruleConstraint,
  )

  hyperruleConstraint = hyperruleConstraintAddValue(hyperruleConstraint, value)

  hyperruleConstraint = hyperruleConstraintHyperrewrite(hyperruleConstraint)

  return arrayReplace(hyperruleConstraints, index, hyperruleConstraint)
}

function hyperruleConstraintDeepWalk(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint {
  return hyperruleConstraint
}

function hyperruleConstraintAddValue(
  hyperruleConstraint: HyperruleConstraint,
  value: Value,
) {
  return hyperruleConstraint
}

function hyperruleConstraintHyperrewrite(
  hyperruleConstraint: HyperruleConstraint,
) {
  return hyperruleConstraint
}
