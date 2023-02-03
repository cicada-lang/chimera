import { arrayReplace } from "../../utils/arrayReplace"
import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import type * as Values from "../value"
import type { Value } from "../value"
import { hyperruleConstraintHyperrewrite } from "./hyperruleConstraintHyperrewrite"

export function pursueHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
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
  arg: Value,
): Array<HyperruleConstraint> | undefined {
  const index = hyperruleConstraints.findIndex(
    (hyperruleConstraint) => hyperruleConstraint.target === hyperrule,
  )

  if (index === -1) {
    return [...hyperruleConstraints, HyperruleConstraint(hyperrule, [arg])]
  }

  const hyperruleConstraint = hyperruleConstraintHyperrewrite(
    solution,
    hyperruleConstraintAddValue(hyperruleConstraints[index], arg),
  )

  if (hyperruleConstraint === undefined) {
    return undefined
  }

  return arrayReplace(hyperruleConstraints, index, hyperruleConstraint)
}

function hyperruleConstraintAddValue(
  hyperruleConstraint: HyperruleConstraint,
  arg: Value,
): HyperruleConstraint {
  return HyperruleConstraint(hyperruleConstraint.target, [
    ...hyperruleConstraint.values,
    arg,
  ])
}
