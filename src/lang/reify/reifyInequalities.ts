import type { Goal } from "../goal"
import * as Goals from "../goal"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionContainsPatternVarInValue,
  substitutionDeepWalk,
  substitutionEqual,
  substitutionPairs,
} from "../substitution"
import { unifyMany } from "../unify"
import type { Value } from "../value"

export function reifyInequalities(
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

  inequalities = removeSubsumed(inequalities)

  return inequalities.map((inequality) =>
    inequalityAsGoal(inequality, substitutionForRenaming),
  )
}

function somePairContainsVar(
  pairs: Array<[Value, Value]>,
  substitutionForRenaming: Substitution,
): boolean {
  return pairs.some(
    ([left, right]) =>
      substitutionContainsPatternVarInValue(substitutionForRenaming, left) ||
      substitutionContainsPatternVarInValue(substitutionForRenaming, right),
  )
}

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

function removeSubsumed(
  inequalities: Array<Substitution>,
  results: Array<Substitution> = [],
): Array<Substitution> {
  if (inequalities.length === 0) return results

  const [inequality, ...restInequalities] = inequalities
  if (
    isSubsumed(inequality, restInequalities) ||
    isSubsumed(inequality, results)
  ) {
    return removeSubsumed(restInequalities, results)
  } else {
    return removeSubsumed(restInequalities, [inequality, ...results])
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
  substitution: Substitution,
  inequalities: Array<Substitution>,
): boolean {
  return inequalities.some((inequality) => {
    const newSubstitution = unifyMany(
      substitution,
      substitutionPairs(inequality),
    )
    return newSubstitution && substitutionEqual(newSubstitution, substitution)
  })
}

function inequalityAsGoal(
  inequality: Substitution,
  substitutionForRenaming: Substitution,
) {
  const pairs = substitutionPairs(inequality)
  return pairs.length === 1
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
      )
}
