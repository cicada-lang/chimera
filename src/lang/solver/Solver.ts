import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { Solution } from "../solution"
import { Task } from "../solver"
import type { QueryPattern } from "../stmts/find"

/**

   A solver has a queue of tasks,
   one task represents a path we are searching.

   A task has a queue of goals,
   undertaking a task will generate new tasks
   by pursuing it's first goal,
   one task for each clause of a relation,
   representing a new branching path to search.

**/

export type SolveOptions = {
  limit?: number
}

export class Solver {
  solutions: Array<Solution> = []

  constructor(public pattern: QueryPattern, public tasks: Array<Task>) {}

  static start(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const task = new Task(Solution.emptySolution(), goals)
    return new Solver(pattern, [task])
  }

  solve(mod: Mod, options: SolveOptions): Array<Solution> {
    const limit = options.limit || Infinity

    while (this.solutions.length < limit && this.tasks.length > 0) {
      const solution = this.step(mod, options)
      if (solution !== undefined) {
        this.solutions.push(solution)
      }
    }

    return this.solutions
  }

  private step(mod: Mod, options: SolveOptions): Solution | undefined {
    const task = this.tasks.shift() as Task
    const tasks = task.undertake(mod)
    if (tasks === undefined) return task.solution

    // Trying to be fair for all tasks,
    // we push the generated new tasks to the end of the queue.
    this.tasks.push(...tasks)
  }
}
