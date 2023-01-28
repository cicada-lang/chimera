import { arrayReplace } from "src/utils/arrayReplace"
import { hyperrewrite } from "../hyperrewrite"
import type { Hyperrule } from "../hyperrule"
import { HyperruleConstraint, Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type { Value } from "../value"

export function updateHyperruleConstraints(
  solution: Solution,
  hyperruleConstraints: Array<HyperruleConstraint>,
  hyperrule: Hyperrule,
  value: Value,
): Array<HyperruleConstraint> | undefined {
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

  const newHyperruleConstraint =
    hyperruleConstraintHyperrewrite(hyperruleConstraint)

  if (newHyperruleConstraint === undefined) {
    return undefined
  }

  return arrayReplace(hyperruleConstraints, index, newHyperruleConstraint)
}

export function hyperruleConstraintDeepWalk(
  solution: Solution,
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint {
  return HyperruleConstraint(
    hyperruleConstraint.hyperrule,
    hyperruleConstraint.values.map((value) =>
      substitutionDeepWalk(solution.substitution, value),
    ),
  )
}

function hyperruleConstraintAddValue(
  hyperruleConstraint: HyperruleConstraint,
  value: Value,
): HyperruleConstraint {
  return HyperruleConstraint(hyperruleConstraint.hyperrule, [
    ...hyperruleConstraint.values,
    value,
  ])
}

export function hyperruleConstraintHyperrewrite(
  hyperruleConstraint: HyperruleConstraint,
): HyperruleConstraint | undefined {
  const values = hyperrewrite(
    hyperruleConstraint.hyperrule,
    hyperruleConstraint.values,
  )

  if (values === false) {
    return undefined
  }

  return HyperruleConstraint(hyperruleConstraint.hyperrule, values)
}
