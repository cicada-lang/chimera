import { Env } from "../env"
import { Goal, pursue } from "../goal"
import { Mod } from "../mod"
import { Solution } from "../solution"

export class GoalQueue {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  step(mod: Mod, env: Env): Array<GoalQueue> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    const queues = pursue(mod, env, this.solution, goal)
    return queues.map(
      // NOTE About searching again
      // push front |   depth first
      // push back  | breadth first
      // NOTE `concat` is like push back
      (queue) => new GoalQueue(queue.solution, this.goals.concat(queue.goals)),
    )
  }
}
