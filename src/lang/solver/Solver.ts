import YAML from "yaml"
import { Env } from "../env"
import { formatGoal, Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { formatVariable, Solution, solutionNames, SolutionNull } from "../solution"

/**

   # Solver

   In implementation, we use array of queues to do search,
   but we should be thinking in terms of tree instead of queues,
   only by doing so, we can have a clear understanding of the implementation.

**/

export type SolveOptions = {
  limit?: number
  debug?: boolean
}

export type SolverReport = Array<SolverReportQueue>

export type SolverReportQueue = {
  solution: Array<string>
  goals: Array<string>
}

export class Solver<T> {
  constructor(public queues: Array<GoalQueue>) {}

  static fromGoals<T>(goals: Array<Goal>): Solver<T> {
    const queues = [new GoalQueue(SolutionNull(), goals)]
    return new Solver(queues)
  }

  solve(mod: Mod, env: Env, options: SolveOptions): Array<Solution> {
    const { limit } = options

    const solutions = []
    while (limit === undefined || solutions.length < limit) {
      const solution = this.next(mod, env, options)
      if (solution === undefined) break
      solutions.push(solution)
    }

    return solutions
  }

  private next(mod: Mod, env: Env, options: SolveOptions): Solution | undefined {
    while (true) {
      if (options.debug) {
        this.debug()
      }

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

  private debug(): void {
    if (this.queues.length === 0) return

    console.log(this.reportFormatYAML())
  }

  private reportFormatYAML(): string {
    return YAML.stringify(this.report())
  }

  private report(): SolverReport {
    const queues = []
    for (const queue of this.queues) {
      const solution = solutionNames(queue.solution).map((name) =>
        formatVariable(queue.solution, name),
      )
      const goals = queue.goals.map(formatGoal)
      queues.push({ solution, goals })
    }

    return queues
  }
}
