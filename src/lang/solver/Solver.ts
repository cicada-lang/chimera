import YAML from "yaml"
import type { Json } from "../../utils/Json"
import { formatExp } from "../exp"
import { formatGoal, Goal } from "../goal"
import type { Mod } from "../mod"
import { Debugger, Task } from "../solver"
import {
  formatQueryPattern,
  formatSubstitutionForQueryPattern,
  QueryPattern,
} from "../stmts/find"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionLookup,
  substitutionNames,
  SubstitutionNull,
} from "../substitution"

/**

   A solver has a queue of tasks,
   one task represents a path we are searching.

   A task has a queue of goals.

   Pursuing a goal will generate new tasks,
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
  substitutions: Array<Json>
  queryPattern: string
}

export type SolverReportTask = {
  substitution: Record<string, Json>
  goals: Array<string>
}

export class Solver {
  stepCount = 0
  substitutions: Array<Substitution> = []

  constructor(public pattern: QueryPattern, public tasks: Array<Task>) {}

  static fromGoals(pattern: QueryPattern, goals: Array<Goal>): Solver {
    const task = new Task(SubstitutionNull(), goals)
    return new Solver(pattern, [task])
  }

  solve(mod: Mod, options: SolveOptions): Array<Substitution> {
    const limit = options.limit || Infinity
    const debugOptions = { skipPrompt: options.debug?.skipPrompt || 0 }

    while (this.substitutions.length < limit && this.tasks.length > 0) {
      if (options.debug && mod.options.loader.options.debugger) {
        this.debugStep(mod.options.loader.options.debugger, debugOptions)
      }

      const substitution = this.step(mod, options)
      if (substitution !== undefined) {
        this.substitutions.push(substitution)
      }
    }

    return this.substitutions
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

  private step(mod: Mod, options: SolveOptions): Substitution | undefined {
    this.stepCount++
    // NOTE pop + push = depth-first search
    // const task = this.tasks.pop() as Task
    // NOTE shift + push = breadth-first search
    const task = this.tasks.shift() as Task
    const tasks = task.undertake(mod)
    if (tasks === undefined) return task.substitution
    this.tasks.push(...tasks)
  }

  reportFormatYAML(): string {
    return YAML.stringify(this.report())
  }

  report(): SolverReport {
    return {
      stepCount: this.stepCount,
      tasks: this.tasks.map(reportTask),
      queryPattern: formatQueryPattern(this.pattern),
      substitutions: JSON.parse(
        formatSubstitutionForQueryPattern(this.substitutions, this.pattern),
      ),
    }
  }
}

function reportTask(task: Task): SolverReportTask {
  const substitution = Object.fromEntries(
    substitutionNames(task.substitution).map((name) => [
      name,
      JSON.parse(formatVariableNoReify(task.substitution, name)),
    ]),
  )

  const goals = task.goals.map(formatGoal)

  return {
    substitution,
    goals,
  }
}

function formatVariableNoReify(
  substitution: Substitution,
  name: string,
): string {
  const exp = substitutionLookup(substitution, name)
  if (exp === undefined) {
    return `"?${name}"`
  } else {
    return `${formatExp(substitutionDeepWalk(substitution, exp))}`
  }
}
