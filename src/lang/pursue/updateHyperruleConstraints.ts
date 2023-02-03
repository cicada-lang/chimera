import { arrayReplace } from "../../utils/arrayReplace"
import { hyperrewrite } from "../hyperrewrite"
import { HyperruleConstraint, Solution } from "../solution"
import type * as Values from "../value"
import type { Value } from "../value"
import { hyperruleConstraintDeepWalk } from "./hyperruleConstraintDeepWalk"

export function updateHyperruleConstraints(
  solution: Solution,
  hyperruleConstraints: Array<HyperruleConstraint>,
  hyperrule: Values.Hyperrule,
  value: Value,
): Array<HyperruleConstraint> | undefined {
  const index = hyperruleConstraints.findIndex(
    (hyperruleConstraint) => hyperruleConstraint.target === hyperrule,
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

  const newHyperruleConstraint =
    hyperruleConstraintHyperrewrite(hyperruleConstraint)

  if (newHyperruleConstraint === undefined) {
    return undefined
  }

  return arrayReplace(hyperruleConstraints, index, newHyperruleConstraint)
}

function hyperruleConstraintAddValue(
  hyperruleConstraint: HyperruleConstraint,
  value: Value,
): HyperruleConstraint {
  return HyperruleConstraint(hyperruleConstraint.target, [
    ...hyperruleConstraint.values,
    value,
  ])
}

export function hyperruleConstraintHyperrewrite(
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint | undefined {
  const values = hyperrewrite(
    hyperruleConstraint.target.hyperrule,
    hyperruleConstraint.values,
  )

  if (values === false) {
    return undefined
  }

  return HyperruleConstraint(hyperruleConstraint.target, values)
}
