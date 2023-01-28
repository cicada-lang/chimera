import { Solution, solutionUpdate } from "../solution"
import { substitutionEqual, substitutionPrefix } from "../substitution"
import { unify } from "../unify"
import type { Value } from "../value"
import { removeInequalitiesSubsumedByTypeConstraints } from "./removeInequalitiesSubsumedByTypeConstraints"

export function pursueNotEqual(
  solution: Solution,
  left: Value,
  right: Value,
): Solution | undefined {
  const substitution = unify(solution.substitution, left, right)

  /**

     `unify` fails. In this case, there is no possible way of
     extending the current `solution.substitution` to make `left` not
     equal to `right` (if there was, `unify` would have returned this
     extended substitution).  Thus, this `NotEqual` constraint can
     safely be discarded.

  **/

  if (substitution === undefined) {
    return solution
  }

  /**

     `unify` succeeds without extending the current
     `solution.substitution`.  In this case, `left` and `right` are
     already equal, meaning the `NotEqual` constraint is violated.

  **/

  if (substitutionEqual(substitution, solution.substitution)) {
    return undefined
  }

  /**

     `unify` succeeds and returns an extended `solution.substitution`.
     In this case, the extension of the substitution contains
     precisely all those pairs whose key and value must be equal for
     the unification to succeed.  In other words, for the `NotEqual`
     constraint to hold, this extension must not hold! Thus, we add
     this extension to `solution.inequalities`.

  **/

  const inequality = substitutionPrefix(substitution, solution.substitution)

  const inequalities = [
    ...solution.inequalities,
    ...removeInequalitiesSubsumedByTypeConstraints(
      solution,
      [inequality],
      solution.typeConstraints,
    ),
  ]

  return solutionUpdate(solution, { inequalities })
}
