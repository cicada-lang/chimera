import type { Exp } from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import { prepareSubstitution } from "../reify"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionPairs,
} from "../substitution"

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
  const substitutionForRenaming = prepareSubstitution(exp)
  const constraints = reifyInequalities(solution, substitutionForRenaming)
  exp = substitutionDeepWalk(substitutionForRenaming, exp)
  return Reification(exp, constraints)
}

export function reifyInequalities(
  solution: Solution,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  return solution.inequalities.map((inequality) =>
    Goals.Disj(
      substitutionPairs(inequality).map(([left, right]) =>
        Goals.NotEqual(
          substitutionDeepWalk(substitutionForRenaming, left),
          substitutionDeepWalk(substitutionForRenaming, right),
        ),
      ),
    ),
  )
}
