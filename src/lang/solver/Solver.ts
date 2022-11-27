import YAML from "yaml"
import type { Json } from "../../utils/Json"
import { formatExp } from "../exp"
import { formatGoal, Goal } from "../goal"
import type { Mod } from "../mod"
import {
  Solution,
  solutionDeepWalk,
  solutionLookup,
  solutionNames,
  SolutionNull,
} from "../solution"
import { Debugger, Task } from "../solver"
import {
  formatQueryPattern,
  formatSolutionForQueryPattern,
  QueryPattern,
} from "../stmts/find"

/**

   A solver has a queue of tasks,
   one task represents a path we are searching.

   A task has a queue of goals.

   Undertaking a task will generate new tasks
   by pursuing its first goal,
   one task for each clause of a relation,
   representing a new branching path to search.

**/

export type SolveOptions = {
  limit?: number
  debug?: {
    skipPrompt: number
  }
}

export type SolverReport = {
  stepCount: number
  tasks: Array<SolverReportTask>
  solutions: Array<Json>
  queryPattern: string
}

export type SolverReportTask = {
  solution: Record<string, Json>
  goals: Array<string>
}

export class Solver {
  stepCount = 0
  solutions: Array<Solution> = []

  constructor(public pattern: QueryPattern, public tasks: Array<Task>) {}

  static fromGoals(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const task = new Task(SolutionNull(), goals)
    return new Solver(pattern, [task])
  }

  private step(mod: Mod, options: SolveOptions): Solution | undefined {
    this.stepCount++
    // NOTE pop + push = depth-first search
    // const task = this.tasks.pop() as Task
    // NOTE shift + push = breadth-first search
    const task = this.tasks.shift() as Task
    const tasks = task.undertake(mod)
    if (tasks === undefined) return task.solution
    this.tasks.push(...tasks)
  }

  solve(mod: Mod, options: SolveOptions): Array<Solution> {
    const limit = options.limit || Infinity
    const debugOptions = { skipPrompt: options.debug?.skipPrompt || 0 }

    while (this.solutions.length < limit && this.tasks.length > 0) {
      if (options.debug && mod.options.loader.options.debugger) {
        this.debugStep(mod.options.loader.options.debugger, debugOptions)
      }

      const solution = this.step(mod, options)
      if (solution !== undefined) {
        this.solutions.push(solution)
      }
    }

    return this.solutions
  }

  private debugStep(
    { prompt, report }: Debugger,
    debugOptions: { skipPrompt: number },
  ): void {
    // NOTE Side-effect on `debugOptions`

    report(this)

    if (prompt) {
      if (
        debugOptions.skipPrompt <= 0 ||
        Number.isNaN(debugOptions.skipPrompt)
      ) {
        debugOptions.skipPrompt = prompt(this)
      } else {
        debugOptions.skipPrompt--
      }
    }
  }

  reportFormatYAML(): string {
    return YAML.stringify(this.report())
  }

  report(): SolverReport {
    return {
      stepCount: this.stepCount,
      tasks: this.tasks.map(reportTask),
      queryPattern: formatQueryPattern(this.pattern),
      solutions: JSON.parse(
        formatSolutionForQueryPattern(this.solutions, this.pattern),
      ),
    }
  }
}

function reportTask(task: Task): SolverReportTask {
  const solution = Object.fromEntries(
    solutionNames(task.solution).map((name) => [
      name,
      JSON.parse(formatVariableNoReify(task.solution, name)),
    ]),
  )

  const goals = task.goals.map(formatGoal)

  return {
    solution,
    goals,
  }
}

function formatVariableNoReify(solution: Solution, name: string): string {
  const exp = solutionLookup(solution, name)
  if (exp === undefined) {
    return `"?${name}"`
  } else {
    return `${formatExp(solutionDeepWalk(solution, exp))}`
  }
}
