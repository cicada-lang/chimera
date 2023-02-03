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
  const index = solution.hyperruleConstraints.findIndex(
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
        hyperruleConstraints: [
          ...solution.hyperruleConstraints,
          hyperruleConstraint,
        ],
      }),
    ]
  }

  const hyperruleConstraint = hyperruleConstraintHyperrewrite(
    solution,
    HyperruleConstraint(solution.hyperruleConstraints[index].target, [
      ...solution.hyperruleConstraints[index].values,
      arg,
    ]),
  )

  if (hyperruleConstraint === undefined) {
    return []
  }

  return [
    solutionUpdate(solution, {
      hyperruleConstraints: arrayReplace(
        solution.hyperruleConstraints,
        index,
        hyperruleConstraint,
      ),
    }),
  ]
}
