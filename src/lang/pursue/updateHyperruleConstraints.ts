import type { Hyperrule } from "../hyperrule"
import type { HyperruleConstraint, Solution } from "../solution"
import type { Value } from "../value"

export function updateHyperruleConstraints(
  solution: Solution,
  hyperruleConstraints: Array<HyperruleConstraint>,
  hyperrule: Hyperrule,
  value: Value,
): Array<HyperruleConstraint> {
  const found = hyperruleConstraints.find(
    (hyperruleConstraint) => hyperruleConstraint.hyperrule === hyperrule,
  )

  if (found === undefined) {
    //
  }

  return hyperruleConstraints
}
