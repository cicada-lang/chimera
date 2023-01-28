import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"
import { maintainHyperruleConstraints } from "./maintainHyperruleConstraints"
import { updateHyperruleConstraints } from "./updateHyperruleConstraints"

export function pursueHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
  arg = substitutionDeepWalk(solution.substitution, arg)

  const hyperruleConstraints = updateHyperruleConstraints(
    solution,
    solution.hyperruleConstraints,
    HyperruleConstraint(target.hyperrule, arg),
  )

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
