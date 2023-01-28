import { Solution, solutionUpdate } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"
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
