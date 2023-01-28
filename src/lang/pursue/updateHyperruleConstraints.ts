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

  const hyperruleConstraint = hyperruleConstraints[index]

  return hyperruleConstraints
}
