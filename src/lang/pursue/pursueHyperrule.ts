import { arrayReplace } from "../../utils/arrayReplace"
import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"
import { hyperruleConstraintDeepWalk } from "./hyperruleConstraintDeepWalk"
import { hyperruleConstraintHyperrewrite } from "./hyperruleConstraintHyperrewrite"

export function pursueHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
  arg = substitutionDeepWalk(solution.substitution, arg)

  const hyperruleConstraints = updateHyperruleConstraints(
    solution,
    solution.hyperruleConstraints,
    target,
    arg,
  )

  if (hyperruleConstraints === undefined) {
    return []
  }

  return [
    solutionUpdate(solution, {
      hyperruleConstraints,
    }),
  ]
}

function updateHyperruleConstraints(
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
