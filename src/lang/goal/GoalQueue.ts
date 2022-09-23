import { Goal } from "../goal"
import { Solution } from "../solution"

export class GoalQueue {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  step(): Array<GoalQueue> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    const queues = goal.evaluate(this.solution)
    return queues.map(
      // NOTE about searching again
      // push front |   depth first
      // push back  | breadth first
      // NOTE `concat` is like push back
      (queue) => new GoalQueue(queue.solution, [...this.goals, ...queue.goals]),
    )
  }
}
