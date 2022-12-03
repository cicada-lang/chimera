import type { Exp } from "../exp"
import type { Goal } from "../goal"
import * as Goals from "../goal"
import { prepareSubstitution } from "../reify"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionPairs,
  substitutionWalk,
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

/**

   We do not sort the constraints (and the nested constraints in `disj`),
   the order depends on the implementation and the input code,
   just like the order of solutions (which is not sorted).

**/

export function reifyInequalities(
  solution: Solution,
  substitutionForRenaming: Substitution,
): Array<Goal> {
  return solution.inequalities
    .map(substitutionPairs)
    .filter((pairs) => !somePairContainsVar(pairs, substitutionForRenaming))
    .map((pairs) =>
      Goals.Disj(
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
  pairs: Array<[Exp, Exp]>,
  substitutionForRenaming: Substitution,
): boolean {
  return pairs.some(
    ([left, right]) =>
      containsVar(left, substitutionForRenaming) ||
      containsVar(right, substitutionForRenaming),
  )
}

function containsVar(exp: Exp, substitutionForRenaming: Substitution): boolean {
  switch (exp["@kind"]) {
    case "PatternVar": {
      exp = substitutionWalk(substitutionForRenaming, exp)
      return exp["@kind"] === "PatternVar"
    }

    case "ReifiedVar": {
      return false
    }

    case "String":
    case "Number":
    case "Boolean":
    case "Null": {
      return false
    }

    case "ArrayCons": {
      return (
        containsVar(exp.car, substitutionForRenaming) ||
        containsVar(exp.cdr, substitutionForRenaming)
      )
    }

    case "ArrayNull": {
      return false
    }

    case "Objekt": {
      return Object.values(exp.properties).some((exp) =>
        containsVar(exp, substitutionForRenaming),
      )
    }

    case "Data": {
      return exp.args.some((exp) => containsVar(exp, substitutionForRenaming))
    }
  }
}
