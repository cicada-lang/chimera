import type { Goal } from "../goal"
import { pursue } from "../goal"
import type { Mod } from "../mod"
import type { Solution } from "../solution"

export class Task {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  undertake(mod: Mod): Array<Task> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    // We append the generated new goals
    // to the start of the queue,
    // to get depth-first search.
    return pursue(mod, this.solution, goal).map(
      ([solution, goals]) => new Task(solution, [...goals, ...this.goals]),
    )
  }
}
