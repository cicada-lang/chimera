import type { Exp } from "../exp"
import type { Goal } from "../goal"
import { prepareSubstitution } from "../reify"
import type { Solution } from "../solution"
import { Substitution, substitutionDeepWalk } from "../substitution"

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
  const constraints = reifyInequalities(solution, substitutionWithReifiedVars)
  exp = substitutionDeepWalk(substitutionWithReifiedVars, exp)
  return Reification(exp, constraints)
}

export function reifyInequalities(
  solution: Solution,
  substitution: Substitution,
): Array<Goal> {
  const constraints: Array<Goal> = []
  for (const inequality of solution.inequalities) {
    // TODO We need `disj` to compose goals
    // for (const [left, right] of substitutionPairs(inequality)) {
    //   constraints.push(
    //     Goals.NotEqual(
    //       substitutionDeepWalk(substitutionWithReifiedVars, left),
    //       substitutionDeepWalk(substitutionWithReifiedVars, right),
    //     ),
    //   )
    // }
  }

  return constraints
}
