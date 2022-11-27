import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Solution } from "../solution"
import { unify } from "../unify"

export class Task {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  undertake(mod: Mod): Array<Task> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    // We append the generated new goals
    // to the start of the queue,
    // to get depth-first search.
    return pursue(mod, this.solution, goal).map(
      ([solution, goals]) => new Task(solution, goals.concat(this.goals)),
    )
  }
}

function pursue(
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
  }
}
