import { pursue } from "../pursue/index.js"
import { solutionUpdate, type Solution } from "../solution/index.js"

/**

   Constraint logic programming seems to me
   much like how a person solve a problem
   by working on partial solutions until some of them are complete.

   A problem is a partial solution.

   A `solve` takes a problem,
   and has a queue of partial solutions,
   one solution represents a path we are searching.

   A `Solution` has a queue of `goals`,
   if the queue is empty the solution is complete,
   if the queue is not empty the solution is partial.

   Beside the `goals`, a `Solution` is composed by many kind of constraints,
   among which the most important one is `substitution` of bindings,
   `goals` can be viewed as special constraint.

   To work on a solution is to pursue it's first goal.

   Working on a solution might generate new solutions to work on,
   for examples, one new solution for each clause of a relation,
   or one new solution for each subgoal of a disjunction,
   representing a new branching path to search.

**/

export function solve(
  partialSolution: Solution,
  options: { limit: number },
): Array<Solution> {
  const partialSolutions = [partialSolution]
  const solutions: Array<Solution> = []
  const limit = options.limit || Infinity
  while (true) {
    if (solutions.length >= limit) {
      // NOTE We might find more then one solutions in one step,
      // thus the length of `solutions` might be larger than the `limit`.
      return solutions.slice(0, limit)
    }

    // NOTE Working on the first `partialSolution`.
    const partialSolution = partialSolutions.shift()
    if (partialSolution === undefined) {
      return solutions
    }

    if (partialSolution.goals.length === 0) {
      solutions.push(partialSolution)
      continue
    }

    const [goal, ...restGoals] = partialSolution.goals
    const newSolution = solutionUpdate(partialSolution, { goals: restGoals })
    const newPartialSolutions = pursue(newSolution, goal)

    // NOTE We try to be fair by pushing
    // the newly generated partial solutions to the end.
    for (const solution of newPartialSolutions) {
      if (solution.goals.length === 0) {
        solutions.push(solution)
      } else {
        partialSolutions.push(solution)
      }
    }
  }
}
