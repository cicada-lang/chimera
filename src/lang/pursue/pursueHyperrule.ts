import { arrayReplace } from "../../utils/arrayReplace"
import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import type * as Values from "../value"
import type { Value } from "../value"
import { hyperruleConstraintHyperrewrite } from "./hyperruleConstraintHyperrewrite"

export function pursueHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  args: Array<Value>,
): Array<Solution> {
  const index = solution.hyperruleConstraints.findIndex(
    (hyperruleConstraint) => hyperruleConstraint.target === target,
  )

  if (index === -1) {
    const result = hyperruleConstraintHyperrewrite(
      solution,
      HyperruleConstraint(target, args),
    )

    if (result === undefined) {
      return []
    }

    return [
      solutionUpdate(solution, {
        goals: [...result.goals, ...solution.goals],
        hyperruleConstraints: [
          ...solution.hyperruleConstraints,
          result.hyperruleConstraint,
        ],
      }),
    ]
  }

  const result = hyperruleConstraintHyperrewrite(
    solution,
    HyperruleConstraint(solution.hyperruleConstraints[index].target, [
      ...solution.hyperruleConstraints[index].values,
      ...args,
    ]),
  )

  if (result === undefined) {
    return []
  }

  return [
    solutionUpdate(solution, {
      goals: [...result.goals, ...solution.goals],
      hyperruleConstraints: arrayReplace(
        solution.hyperruleConstraints,
        index,
        result.hyperruleConstraint,
      ),
    }),
  ]
}
