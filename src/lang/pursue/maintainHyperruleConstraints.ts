import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { hyperruleConstraintDeepWalk } from "./hyperruleConstraintDeepWalk"
import { hyperruleConstraintHyperrewrite } from "./updateHyperruleConstraints"

export function maintainHyperruleConstraints(
  solution: Solution | undefined,
): Solution | undefined {
  if (solution === undefined) {
    return undefined
  }

  const hyperruleConstraints: Array<HyperruleConstraint> = []
  for (const hyperruleConstraint of solution.hyperruleConstraints) {
    const result = hyperruleConstraintHyperrewrite(
      hyperruleConstraintDeepWalk(solution, hyperruleConstraint),
    )

    if (result === undefined) {
      return undefined
    }

    hyperruleConstraints.push(result)
  }

  return solutionUpdate(solution, {
    hyperruleConstraints,
  })
}
