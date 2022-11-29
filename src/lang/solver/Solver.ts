import type { Goal } from "../goal"
import type { Mod } from "../mod"
import { pursue } from "../pursue"
import { Solution } from "../solution"
import type { QueryPattern } from "../stmts/find"

/**

   A `Solver` has a queue of `partialSolutions`,
   one solution represents a path we are searching.

   A `Solution` has a queue of `goals`,
   if this queue is not empty, the solution is partial.

   To work on a solution is to pursue it's first goal.

   Working on a solution might generate new solutions to work on,
   one solution for each clause of a relation,
   representing a new branching path to search.

**/

export type SolveOptions = {
  limit?: number
}

export class Solver {
  solutions: Array<Solution> = []

  constructor(
    public pattern: QueryPattern,
    public partialSolutions: Array<Solution>,
  ) {}

  static start(pattern: QueryPattern, goals: Array<Goal>): Solver {
    return new Solver(pattern, [Solution.initial(goals)])
  }

  solve(mod: Mod, options: SolveOptions): Array<Solution> {
    const limit = options.limit || Infinity
    while (this.solutions.length < limit && this.partialSolutions.length > 0) {
      const solution = this.solveStep(mod, options)
      if (solution !== undefined) {
        this.solutions.push(solution)
      }
    }

    return this.solutions
  }

  private solveStep(mod: Mod, options: SolveOptions): Solution | undefined {
    /**

       Doing side-effect on `this.partialSolutions` is intended,
       because `Solver` is the interfacing class to provide
       interaction to users.

    **/

    const solution = this.partialSolutions.shift() as Solution

    /**

       We can do side-effect to `solution` in the following code,
       because when we get it out from queue it is already not owned
       by any other code anymore.

       If we do not use side-effect here, we have to construct a
       similar `solution` to pass to `pursue` anyway.

    **/

    const goal = solution.goals.shift()
    if (goal === undefined) return solution

    const partialSolutions = pursue(mod, solution, goal)
    if (partialSolutions === undefined) return solution

    /**

       We try to be fair by pushing the
       newly generated `partialSolutions`
       to the end of the queue.

    **/

    this.partialSolutions.push(...partialSolutions)
  }
}
