import YAML from "yaml"
import { Json } from "../../utils/Json"
import { Env } from "../env"
import { formatGoal, Goal, GoalQueue } from "../goal"
import { Mod } from "../mod"
import { formatVariable, Solution, solutionNames, SolutionNull } from "../solution"
import { Debugger } from "../solver"
import { formatQueryPattern, QueryPattern } from "../stmts/query"

/**

   # Solver

   In implementation, we use array of queues to do search,
   but we should be thinking in terms of tree instead of queues,
   only by doing so, we can have a clear understanding of the implementation.

**/

export type SolveOptions = {
  limit?: number
  debug?: {
    skipPrompt: number
  }
}

export type SolverReport = {
  count: number
  queues: Array<SolverReportQueue>
  solutions: Array<Json>
}

export type SolverReportQueue = {
  solution: Record<string, Json>
  goals: Array<string>
}

export class Solver {
  count = 0
  solutions: Array<Solution> = []

  constructor(public pattern: QueryPattern, public queues: Array<GoalQueue>) {}

  static fromGoals(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const queue = new GoalQueue(SolutionNull(), goals)
    return new Solver(pattern, [queue])
  }

  solve(mod: Mod, env: Env, options: SolveOptions): Array<Solution> {
    const limit = options.limit || Infinity
    const debugOptions = { skipPrompt: options.debug?.skipPrompt || 0 }

    while (this.solutions.length < limit && this.queues.length > 0) {
      if (options.debug && mod.options.loader.options.debugger) {
        this.debugStep(mod.options.loader.options.debugger, debugOptions)
      }

      const solution = this.step(mod, env, options)
      if (solution !== undefined) {
        this.solutions.push(solution)
      }
    }

    return this.solutions
  }

  private debugStep({ prompt, report }: Debugger, debugOptions: { skipPrompt: number }): void {
    // NOTE Side-effect on `debugOptions`

    report(this)

    if (prompt) {
      if (debugOptions.skipPrompt <= 0 || Number.isNaN(debugOptions.skipPrompt)) {
        debugOptions.skipPrompt = prompt(this)
      } else {
        debugOptions.skipPrompt--
      }
    }
  }

  private step(mod: Mod, env: Env, options: SolveOptions): Solution | undefined {
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
    return {
      count: this.count,
      queues: this.queues.map(reportQueue),
      solutions: JSON.parse(formatQueryPattern(this.solutions, this.pattern)),
    }
  }
}

function reportQueue(queue: GoalQueue): SolverReportQueue {
  const names = solutionNames(queue.solution)
  const solution = Object.fromEntries(
    names.map((name) => [name, JSON.parse(formatVariable(queue.solution, name))]),
  )

  const goals = queue.goals.map(formatGoal)

  return {
    solution,
    goals,
  }
}
