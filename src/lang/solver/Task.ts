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

    return pursue(mod, this.solution, goal).map((task) => {
      // NOTE shift + append = depth-first search
      const goals = task.goals.concat(this.goals)
      // NOTE shift + prepend = breadth-first search
      // const goals = this.goals.concat(task.goals)
      return new Task(task.solution, goals)
    })
  }
}

function pursue(mod: Mod, solution: Solution, goal: Goal): Array<Task> {
  switch (goal["@kind"]) {
    case "Apply": {
      return goal.relation.clauses.flatMap((clause) => {
        const { exp, goals } = refreshClause(mod, clause)
        const newSolution = unify(solution, exp, goal.arg)
        return newSolution ? [new Task(newSolution, goals)] : []
      })
    }

    case "Unifiable": {
      const newSolution = unify(solution, goal.left, goal.right)
      return newSolution ? [new Task(newSolution, [])] : []
    }
  }
}
