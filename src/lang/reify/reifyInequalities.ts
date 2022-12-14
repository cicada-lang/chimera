import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVar,
  substitutionDeepWalk,
  substitutionEqual,
  substitutionPairs,
} from "../substitution"
import { unifyMany } from "../unify"
import type { Value } from "../value"

export function reifyInequalities(
  mod: Mod,
  solution: Solution,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  let inequalities = solution.inequalities

  /**

     If a disequality constraint contains a pair
     where the car (resp., cdr) is a fresh variable,
     then we may discard this disequality constraint.

     This is because when the car (resp., cdr) is a fresh variable,
     we can always pick something for this fresh variable that is
     not equal to the cdr (resp., car)
     and satisfy the disequality constraint.

  **/

  inequalities = inequalities.filter(
    (inequality) =>
      !somePairContainsVar(
        substitutionPairs(inequality),
        substitutionForRenaming,
      ),
  )

  /**

     Secondly, we can discard disequality constraints that are
     subsumed by other disequality constraints.

     We say that a constraint d1 subsumes d2 (or d2 is subsumed by d1)
     if whenever d1 holds, d2 also holds.

     The important observation to make here is that
     d1 subsumes d2 if every pair in d1 is also contained in d2
     (with possibly more pairs not in d1).

     (Having more goals in a disj weakens it.)

  **/

  inequalities = removeSubsumed(mod, inequalities)

  return inequalities
    .map(substitutionPairs)
    .map((pairs) =>
      pairs.length === 1
        ? pairs.map(([left, right]) =>
            Goals.NotEqual(
              substitutionDeepWalk(substitutionForRenaming, left),
              substitutionDeepWalk(substitutionForRenaming, right),
            ),
          )[0]
        : Goals.Disj(
            pairs.map(([left, right]) =>
              Goals.NotEqual(
                substitutionDeepWalk(substitutionForRenaming, left),
                substitutionDeepWalk(substitutionForRenaming, right),
              ),
            ),
          ),
    )
}

function somePairContainsVar(
  pairs: Array<[Value, Value]>,
  substitutionForRenaming: Substitution,
): boolean {
  return pairs.some(
    ([left, right]) =>
      substitutionContainsPatternVar(left, substitutionForRenaming) ||
      substitutionContainsPatternVar(right, substitutionForRenaming),
  )
}

function removeSubsumed(
  mod: Mod,
  inequalities: Array<Substitution>,
  results: Array<Substitution> = [],
): Array<Substitution> {
  if (inequalities.length === 0) return results

  const [inequality, ...restInequalities] = inequalities
  if (
    isSubsumed(mod, inequality, restInequalities) ||
    isSubsumed(mod, inequality, results)
  ) {
    return removeSubsumed(mod, restInequalities, results)
  } else {
    return removeSubsumed(mod, restInequalities, [inequality, ...results])
  }
}

/**

   The key idea behind removing subsumed disequality constraints
   is d1 subsumes d2 if we can `unifyMany` d1
   by treating d2 as a substitution
   without extending d2.

   This is because if each pair in d1 is contained in d2,
   unifying them by treating d2 a substitution
   should not require extending d2.

**/

function isSubsumed(
  mod: Mod,
  substitution: Substitution,
  inequalities: Array<Substitution>,
): boolean {
  return inequalities.some((inequality) => {
    const newSubstitution = unifyMany(
      mod,
      substitution,
      substitutionPairs(inequality),
    )
    return newSubstitution && substitutionEqual(newSubstitution, substitution)
  })
}
