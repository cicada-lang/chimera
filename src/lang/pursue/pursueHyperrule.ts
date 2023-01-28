import { HyperruleConstraint } from "../hyperrule"
import { Solution, solutionUpdate } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"
import { maintainHyperruleConstraints } from "./maintainHyperruleConstraints"

export function pursueHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
  arg = substitutionDeepWalk(solution.substitution, arg)

  const hyperruleConstraints = [
    ...solution.hyperruleConstraints,
    HyperruleConstraint(target.hyperrule, arg),
  ]

  const newSolution = maintainHyperruleConstraints(
    solutionUpdate(solution, {
      hyperruleConstraints,
    }),
  )

  if (newSolution === undefined) {
    return []
  }

  return [newSolution]
}
