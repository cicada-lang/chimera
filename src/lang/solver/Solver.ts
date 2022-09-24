import { Env } from "../env"
import { Goal, GoalQueue } from "../goal"
import { Solution, SolutionNull } from "../solution"

/**

   # Solver

   In implementation, we use array of queues to do search,
   but we should be thinking in terms of tree instead of queues,
   only by doing so, we can have a clear understanding of the implementation.

**/

export class Solver<T> {
  constructor(public queues: Array<GoalQueue>) {}

  static forGoals<T>(goals: Array<Goal>): Solver<T> {
    const queues = [new GoalQueue(SolutionNull(), goals)]
    return new Solver(queues)
  }

  next(env: Env): Solution | null {
    while (true) {
      const queue = this.queues.shift()
      if (queue === undefined) return null
      const queues = queue.step(env)
      if (queues === undefined) return queue.solution
      // NOTE about searching
      // push front |   depth first
      // push back  | breadth first
      this.queues.push(...queues)
    }
  }

  solve(env: Env, options: { limit?: number } = {}): Array<Solution> {
    const { limit } = options

    const solutions = []
    while (limit === undefined || solutions.length < limit) {
      const subst = this.next(env)
      if (subst === null) break
      solutions.push(subst)
    }

    return solutions
  }
}
