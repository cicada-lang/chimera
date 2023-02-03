import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { hyperruleConstraintHyperrewrite } from "./hyperruleConstraintHyperrewrite"

export function maintainHyperruleConstraints(
  solution: Solution | undefined,
): Solution | undefined {
  if (solution === undefined) {
    return undefined
  }

  const hyperruleConstraints: Array<HyperruleConstraint> = []
  for (const hyperruleConstraint of solution.hyperruleConstraints) {
    const result = hyperruleConstraintHyperrewrite(
      solution,
      hyperruleConstraint,
    )

    if (result === undefined) {
      return undefined
    }

    hyperruleConstraints.push(result.hyperruleConstraint)
  }

  return solutionUpdate(solution, {
    hyperruleConstraints,
  })
}
