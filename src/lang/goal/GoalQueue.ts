import { Env } from "../env"
import { Goal, pursueGoal } from "../goal"
import { Mod } from "../mod"
import { Solution } from "../solution"

export class GoalQueue {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  step(mod: Mod, env: Env): Array<GoalQueue> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    /**
       NOTE About searching (again)

       | push front |   depth first |
       | push back  | breadth first |
    **/

    const queues = pursueGoal(mod, env, this.solution, goal)
    return queues.map(
      (queue) => new GoalQueue(queue.solution, this.goals.concat(queue.goals)),
    )
  }
}
