import type { Env } from "../env"
import type { Mod } from "../mod"
import type { Solution } from "../solution"
import { substitutionWalk } from "../substitution"
import type * as Values from "../value"
import type { Value } from "../value"

export function applyTypeConstraint(
  mod: Mod,
  env: Env,
  solution: Solution,
  target: Values.TypeConstraint,
  arg: Value,
): Array<Solution> {
  arg = substitutionWalk(solution.substitution, arg)

  if (arg["@kind"] === "PatternVar") {
    //
  }

  if (target.predicate(arg)) {
    return [solution]
  } else {
    return []
  }
}
