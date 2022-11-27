import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { Task } from "../solver"
import type { QueryPattern } from "../stmts/find"
import { Substitution, SubstitutionNull } from "../substitution"

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
  substitutions: Array<Substitution> = []

  constructor(public pattern: QueryPattern, public tasks: Array<Task>) {}

  static start(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const task = new Task(SubstitutionNull(), goals)
    return new Solver(pattern, [task])
  }

  solve(mod: Mod, options: SolveOptions): Array<Substitution> {
    const limit = options.limit || Infinity

    while (this.substitutions.length < limit && this.tasks.length > 0) {
      const substitution = this.step(mod, options)
      if (substitution !== undefined) {
        this.substitutions.push(substitution)
      }
    }

    return this.substitutions
  }

  private step(mod: Mod, options: SolveOptions): Substitution | undefined {
    const task = this.tasks.shift() as Task
    const tasks = task.undertake(mod)
    if (tasks === undefined) return task.substitution

    // Trying to be fair for all tasks,
    // we push the generated new tasks to the end of the queue.
    this.tasks.push(...tasks)
  }
}
