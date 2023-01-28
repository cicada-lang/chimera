import type { Solution } from "../solution"
import { solutionUpdate } from "../solution"
import { substitutionEqual } from "../substitution"
import { unify } from "../unify"
import type { Value } from "../value"
import { maintainHyperruleConstraints } from "./maintainHyperruleConstraints"
import { maintainInequalities } from "./maintainInequalities"
import { maintainTypeConstraints } from "./maintainTypeConstraints"

export function applyEqual(
  solution: Solution,
  left: Value,
  right: Value,
): Solution | undefined {
  const substitution = unify(solution.substitution, left, right)

  if (substitution === undefined) {
    return undefined
  }

  if (substitutionEqual(substitution, solution.substitution)) {
    return solution
  }

  return maintainHyperruleConstraints(
    maintainTypeConstraints(
      maintainInequalities(
        solutionUpdate(solution, {
          substitution,
        }),
      ),
    ),
  )
}
