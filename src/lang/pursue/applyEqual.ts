import { solutionUpdate, type Solution } from "../solution/index.ts"
import { substitutionEqual } from "../substitution/index.ts"
import { unify } from "../unify/index.ts"
import { type Value } from "../value/index.ts"
import { maintainInequalities } from "./maintainInequalities.ts"
import { maintainTypeConstraints } from "./maintainTypeConstraints.ts"

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

  return maintainTypeConstraints(
    maintainInequalities(
      solutionUpdate(solution, {
        substitution,
      }),
    ),
  )
}
