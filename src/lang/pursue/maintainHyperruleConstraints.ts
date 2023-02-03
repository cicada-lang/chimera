import type { Goal } from "../goal"
import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { hyperruleConstraintHyperrewrite } from "./hyperruleConstraintHyperrewrite"

export function maintainHyperruleConstraints(
  solution: Solution | undefined,
): Solution | undefined {
  if (solution === undefined) {
    return undefined
  }

  const hyperruleConstraints: Array<HyperruleConstraint> = []
  const goals: Array<Goal> = []

  for (const hyperruleConstraint of solution.hyperruleConstraints) {
    const result = hyperruleConstraintHyperrewrite(
      solution,
      hyperruleConstraint,
    )

    if (result === undefined) {
      return undefined
    }

    hyperruleConstraints.push(result.hyperruleConstraint)
    goals.push(...result.goals)
  }

  return solutionUpdate(solution, {
    goals: [...goals, ...solution.goals],
    hyperruleConstraints,
  })
}
