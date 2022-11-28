import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionLength,
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
        if (newSolution === undefined) return []
        return [[newSolution, goals]]
      })
    }

    case "Equal": {
      const newSolution = pursueEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []
      return [[newSolution, []]]
    }

    case "NotEqual": {
      const newSolution = pursueNotEqual(mod, solution, goal.left, goal.right)
      if (newSolution === undefined) return []
      return [[newSolution, []]]
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

  if (substitution === undefined) return undefined

  if (
    substitutionLength(substitution) ===
    substitutionLength(solution.substitution)
  ) {
    return solution
  }

  const inequalities: Array<Substitution> = []
  for (const inequality of solution.inequalities) {
    const newSubstitution = unifyMany(
      substitution,
      inequality.toArray().map(([name, exp]) => [Exps.PatternVar(name), exp]),
    )

    if (newSubstitution === undefined) continue

    if (
      substitutionLength(substitution) === substitutionLength(newSubstitution)
    ) {
      return undefined
    }

    inequalities.push(substitutionPrefix(newSubstitution, substitution))
  }

  return solution.update({ substitution, inequalities })
}

function pursueNotEqual(
  mod: Mod,
  solution: Solution,
  left: Exp,
  right: Exp,
): Solution | undefined {
  const substitution = unify(solution.substitution, left, right)

  if (substitution === undefined) return solution

  if (
    substitutionLength(substitution) ===
    substitutionLength(solution.substitution)
  ) {
    return undefined
  }

  const inequality = substitutionPrefix(substitution, solution.substitution)
  const inequalities = [...solution.inequalities, inequality]
  return solution.update({ inequalities })
}
