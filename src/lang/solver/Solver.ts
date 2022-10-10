import YAML from "yaml"
import { Json } from "../../utils/Json"
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

export type SolverReport = {
  count: number
  queues: Array<SolverReportQueue>
}

export type SolverReportQueue = {
  solution: Record<string, Json>
  goals: Array<string>
}

export class Solver {
  count = 0

  constructor(public queues: Array<GoalQueue>) {}

  static fromGoals(goals: Array<Goal>): Solver {
    const queue = new GoalQueue(SolutionNull(), goals)
    return new Solver([queue])
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
    while (this.queues.length > 0) {
      const solution = this.step(mod, env, options)
      if (solution !== undefined) return solution
    }
  }

  private step(mod: Mod, env: Env, options: SolveOptions): Solution | undefined {
    if (options.debug) {
      mod.options.loader.options.debugger.onStep(this)
    }

    this.count++

    const queue = this.queues.shift() as GoalQueue
    const queues = queue.step(mod, env)
    if (queues === undefined) return queue.solution
    // NOTE about searching
    // push front |   depth first
    // push back  | breadth first
    this.queues.push(...queues)
  }

  reportFormatYAML(): string {
    return YAML.stringify(this.report())
  }

  report(): SolverReport {
    const queues = this.queues.map((queue) => {
      const names = solutionNames(queue.solution)
      return {
        solution: Object.fromEntries(
          names.map((name) => [name, JSON.parse(formatVariable(queue.solution, name))]),
        ),
        goals: queue.goals.map(formatGoal),
      }
    })

    return {
      count: this.count,
      queues,
    }
  }
}
