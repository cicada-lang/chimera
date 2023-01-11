import { indent } from "../../utils/indent"
import { evaluateGoalExp, quote } from "../evaluate"
import type { Exp } from "../exp"
import type { GoalExp } from "../goal-exp"
import type { Mod } from "../mod"
import { refresh, refreshGoals } from "../refresh"
import { formatReification, reify } from "../reify"
import { Solver } from "../solver"
import type { Span } from "../span"
import { Stmt } from "../stmt"
import {
  varCollectionFromExp,
  varCollectionFromGoalExp,
  varCollectionMerge,
  varCollectionValidate,
} from "../var-collection"

export class Find extends Stmt {
  constructor(
    public pattern: Exp,
    public limit: number,
    public goals: Array<GoalExp>,
    public span: Span,
  ) {
    super()
  }

  validateSync(mod: Mod): void {
    varCollectionValidate(
      varCollectionMerge([
        varCollectionFromExp(this.pattern),
        ...this.goals.map(varCollectionFromGoalExp),
      ]),
    )
  }

  executeSync(mod: Mod): string {
    const renames = new Map()
    const value = refresh(mod, renames, quote(mod, mod.env, this.pattern))
    const goals = refreshGoals(
      mod,
      renames,
      this.goals.map((goal) => evaluateGoalExp(mod, mod.env, goal)),
    )

    const solver = Solver.start(goals)
    const solutions = solver.solve(mod, { limit: this.limit })

    return formatResults(
      solutions.map((solution) =>
        formatReification(reify(mod, solution, value)),
      ),
    )
  }
}

function formatResults(results: Array<string>): string {
  if (results.length === 0) return "[]"
  if (isLargeResults(results)) {
    return `[ \n${results.map((result) => indent(result)).join(",\n")}\n]`
  } else {
    return `[ ${results.join(", ")} ]`
  }
}

function isLargeResults(results: Array<string>): boolean {
  return (
    results.some((result) => result.includes("\n")) ||
    results.join(", ").length >= 60
  )
}
