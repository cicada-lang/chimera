import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Solution } from "../solution"
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
        if (substitution === undefined) return []
        return [[solution.update({ substitution }), goals]]
      })
    }

    case "Equal": {
      const substitution = unify(solution.substitution, goal.left, goal.right)
      if (substitution === undefined) return []
      return [[solution.update({ substitution }), []]]
    }

    case "NotEqual": {
      throw new Error("TODO")
    }
  }
}
