import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { refreshClause } from "../refresh"
import type { Substitution } from "../substitution"
import { unify } from "../unify"

export class Task {
  constructor(public substitution: Substitution, public goals: Array<Goal>) {}

  undertake(mod: Mod): Array<Task> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    // We append the generated new goals
    // to the start of the queue,
    // to get depth-first search.
    const results = pursue(mod, this.substitution, goal)
    return results.map((task) => {
      const goals = task.goals.concat(this.goals)
      return new Task(task.substitution, goals)
    })
  }
}

function pursue(mod: Mod, substitution: Substitution, goal: Goal): Array<Task> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = refreshClause(mod, clause)
        const newSubstitution = unify(substitution, exp, goal.arg)
        return newSubstitution ? [new Task(newSubstitution, goals)] : []
      })
    }

    case "Unifiable": {
      const newSubstitution = unify(substitution, goal.left, goal.right)
      return newSubstitution ? [new Task(newSubstitution, [])] : []
    }
  }
}
