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
  const hyperruleConstraints = solution.hyperruleConstraints

  const index = hyperruleConstraints.findIndex(
    (hyperruleConstraint) => hyperruleConstraint.target === target,
  )

  if (index === -1) {
    const hyperruleConstraint = hyperruleConstraintHyperrewrite(
      solution,
      HyperruleConstraint(target, [arg]),
    )

    if (hyperruleConstraint === undefined) {
      return []
    }

    return [
      solutionUpdate(solution, {
        hyperruleConstraints: [...hyperruleConstraints, hyperruleConstraint],
      }),
    ]
  }

  const hyperruleConstraint = hyperruleConstraintHyperrewrite(
    solution,
    hyperruleConstraintAddValue(hyperruleConstraints[index], arg),
  )

  if (hyperruleConstraint === undefined) {
    return []
  }

  return [
    solutionUpdate(solution, {
      hyperruleConstraints: arrayReplace(
        hyperruleConstraints,
        index,
        hyperruleConstraint,
      ),
    }),
  ]
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
