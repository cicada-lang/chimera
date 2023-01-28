import { HyperruleConstraint, Solution, solutionUpdate } from "../solution"
import { substitutionDeepWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"

export function applyHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
  arg = substitutionDeepWalk(solution.substitution, arg)

  const hyperruleConstraints = [
    ...solution.hyperruleConstraints,
    HyperruleConstraint(target.hyperrule, arg),
  ]

  return [solutionUpdate(solution, { hyperruleConstraints })]
}
