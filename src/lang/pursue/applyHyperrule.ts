import type { Solution } from "../solution"
import { substitutionWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"

export function applyHyperrule(
  solution: Solution,
  target: Values.Hyperrule,
  arg: Value,
): Array<Solution> {
  throw new Error()
  arg = substitutionWalk(solution.substitution, arg)
}
