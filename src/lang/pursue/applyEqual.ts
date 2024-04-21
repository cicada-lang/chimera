import { solutionUpdate, type Solution } from "../solution/index.js"
import { substitutionEqual } from "../substitution/index.js"
import { unify } from "../unify/index.js"
import { type Value } from "../value/index.js"
import { maintainInequalities } from "./maintainInequalities.js"
import { maintainTypeConstraints } from "./maintainTypeConstraints.js"

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
