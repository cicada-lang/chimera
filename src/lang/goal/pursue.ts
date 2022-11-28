import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Solution } from "../solution"
import {
  Substitution,
  substitutionLength,
  substitutionPrefix,
} from "../substitution"
import { unify } from "../unify"

export function pursue(
  mod: Mod,
  solution: Solution,
  goal: Goal,
): Array<[Solution, Array<Goal>]> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = refreshClause(mod, clause)
        const substitution = unify(solution.substitution, exp, goal.arg)

        // TODO verifying `NotEqual` constraints' validity

        if (substitution === undefined) return []

        return [[solution.update({ substitution }), goals]]
      })
    }

    case "Equal": {
      const substitution = unify(solution.substitution, goal.left, goal.right)

      if (substitution === undefined) return []

      if (
        substitutionLength(substitution) ===
        substitutionLength(solution.substitution)
      ) {
        return [[solution, []]]
      }

      const inequalities: Array<Substitution> = []
      for (const inequality of solution.inequalities) {
        // TODO verifying `NotEqual` constraints' validity
      }

      return [[solution.update({ substitution, inequalities }), []]]
    }

    case "NotEqual": {
      const substitution = unify(solution.substitution, goal.left, goal.right)

      if (substitution === undefined) return [[solution, []]]

      if (
        substitutionLength(substitution) ===
        substitutionLength(solution.substitution)
      ) {
        return []
      }

      const inequality = substitutionPrefix(substitution, solution.substitution)
      const inequalities = [...solution.inequalities, inequality]
      return [[solution.update({ inequalities }), []]]
    }
  }
}
