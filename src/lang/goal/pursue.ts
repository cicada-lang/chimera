import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionEqual,
  substitutionPrefix,
} from "../substitution"
import { unify, unifyMany } from "../unify"

export function pursue(
  mod: Mod,
  solution: Solution,
  goal: Goal,
): Array<[Solution, Array<Goal>]> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = refreshClause(mod, clause)
        const newSolution = pursueEqual(mod, solution, exp, goal.arg)
        return newSolution === undefined ? [] : [[newSolution, goals]]
      })
    }

    case "Equal": {
      const newSolution = pursueEqual(mod, solution, goal.left, goal.right)
      return newSolution === undefined ? [] : [[newSolution, []]]
    }

    case "NotEqual": {
      const newSolution = pursueNotEqual(mod, solution, goal.left, goal.right)
      return newSolution === undefined ? [] : [[newSolution, []]]
    }
  }
}

function pursueEqual(
  mod: Mod,
  solution: Solution,
  left: Exp,
  right: Exp,
): Solution | undefined {
  const substitution = unify(solution.substitution, left, right)

  if (substitution === undefined) {
    return undefined
  }

  if (substitutionEqual(substitution, solution.substitution)) {
    return solution
  }

  const inequalities: Array<Substitution> = []
  for (const inequality of solution.inequalities) {
    const newSubstitution = unifyInequality(substitution, inequality)

    if (newSubstitution === undefined) {
      continue
    }

    if (substitutionEqual(substitution, newSubstitution)) {
      return undefined
    }

    inequalities.push(substitutionPrefix(newSubstitution, substitution))
  }

  return solution.update({ substitution, inequalities })
}

function unifyInequality(
  substitution: Substitution,
  inequality: Substitution,
): Substitution | undefined {
  return unifyMany(
    substitution,
    inequality.toArray().map(([name, exp]) => [Exps.PatternVar(name), exp]),
  )
}

function pursueNotEqual(
  mod: Mod,
  solution: Solution,
  left: Exp,
  right: Exp,
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
     this extension to our disequality store.
  **/

  const inequality = substitutionPrefix(substitution, solution.substitution)
  const inequalities = [...solution.inequalities, inequality]
  return solution.update({ inequalities })
}
