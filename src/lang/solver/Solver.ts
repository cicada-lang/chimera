import type { Goal } from "../goal"
import { pursue } from "../goal"
import type { Mod } from "../mod"
import { Solution } from "../solution"
import type { QueryPattern } from "../stmts/find"

/**

   A solver has a queue of solutions,
   one solution represents a path we are searching.

   A solution has a queue of goals,
   if this queue is not empty, the solution is partial,
   to work on a solution is to pursue it's first goal,
   working on a solution might generate new solutions to work on,
   one solution for each clause of a relation,
   representing a new branching path to search.

**/

export type SolveOptions = {
  limit?: number
}

export class Solver {
  solutions: Array<Solution> = []

  constructor(public pattern: QueryPattern, public tasks: Array<Task>) {}

  static start(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const task = new Task(Solution.initial(), goals)
    return new Solver(pattern, [task])
  }

  solve(mod: Mod, options: SolveOptions): Array<Solution> {
    const limit = options.limit || Infinity

    while (this.solutions.length < limit && this.tasks.length > 0) {
      const solution = this.solveStep(mod, options)
      if (solution !== undefined) {
        this.solutions.push(solution)
      }
    }

    return this.solutions
  }

  private solveStep(mod: Mod, options: SolveOptions): Solution | undefined {
    const task = this.tasks.shift() as Task
    const tasks = workOn(mod, task)
    if (tasks === undefined) return task.solution

    // Trying to be fair for all tasks,
    // we push the generated new tasks to the end of the queue.
    this.tasks.push(...tasks)
  }
}

function workOn(mod: Mod, task: Task): Array<Task> | undefined {
  const goal = task.goals.shift()
  if (goal === undefined) return undefined

  // We append the generated new goals
  // to the start of the queue,
  // to get depth-first search.
  return pursue(mod, task.solution, goal).map(
    ([solution, goals]) => new Task(solution, goals.concat(task.goals)),
  )
}

class Task {
  constructor(public solution: Solution, public goals: Array<Goal>) {}
}
