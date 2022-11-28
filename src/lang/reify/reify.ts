import type { Exp } from "../exp"
import type { Goal } from "../goal"
import { prepareSubstitution } from "../reify"
import type { Solution } from "../solution"
import { substitutionDeepWalk } from "../substitution"

/**

   The `Reification` of an `exp` is the reified exp,
   with a list of constraints represented as goals.

 **/

export type Reification = {
  exp: Exp
  constraints: Array<Goal>
}

export function Reification(exp: Exp, constraints: Array<Goal>): Reification {
  return { exp, constraints }
}

export function reify(solution: Solution, exp: Exp): Reification {
  exp = substitutionDeepWalk(solution.substitution, exp)
  const substitutionWithReifiedVars = prepareSubstitution(exp)
  const constraints: Array<Goal> = []
  return Reification(
    substitutionDeepWalk(substitutionWithReifiedVars, exp),
    constraints,
  )
}
