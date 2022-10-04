import { Env } from "../env"
import { Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { formatVariables, Solution, solutionNames, SolutionNull } from "../solution"
import { formatValue } from "../value"

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

  next(mod: Mod, env: Env): Solution | undefined {
    while (true) {
      // this.report()
      const queue = this.queues.shift()
      if (queue === undefined) return undefined
      const queues = queue.step(mod, env)
      if (queues === undefined) return queue.solution
      // NOTE about searching
      // push front |   depth first
      // push back  | breadth first
      this.queues.push(...queues)
    }
  }

  report(): void {
    console.log("solver.report:")
    console.log()

    for (const queue of this.queues) {
      console.log("  solution:", formatVariables(queue.solution, solutionNames(queue.solution)))
      console.log()

      for (const goal of queue.goals) {
        console.log("   ", formatGoal(goal))
      }

      console.log()
    }
  }

  solve(mod: Mod, env: Env, options: { limit?: number } = {}): Array<Solution> {
    const { limit } = options

    // const limit = 3

    const solutions = []
    while (limit === undefined || solutions.length < limit) {
      const solution = this.next(mod, env)
      if (solution === undefined) break

      solutions.push(solution)
    }

    return solutions
  }
}

export function formatGoal(goal: Goal): string {
  switch (goal.kind) {
    case "Apply": {
      return `${goal.name} ${formatValue(goal.arg)}`
    }

    case "Unifiable": {
      return `unify ${formatValue(goal.left)} = ${formatValue(goal.right)}`
    }
  }
}
