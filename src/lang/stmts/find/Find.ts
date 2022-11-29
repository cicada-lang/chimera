import { indent } from "../../../utils/indent.ts"
import type { Exp } from "../../exp/index.ts"
import * as Exps from "../../exp/index.ts"
import type { GoalExp } from "../../goal-exp/index.ts"
import * as GoalExps from "../../goal-exp/index.ts"
import type { Mod } from "../../mod/index.ts"
import { formatReification, reify } from "../../reify/index.ts"
import type { Solution } from "../../solution/index.ts"
import { Solver } from "../../solver/index.ts"
import type { Span } from "../../span/index.ts"
import { Stmt } from "../../stmt/index.ts"
import { buildSolveOptions, FindOption, QueryPattern } from "./index.ts"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public options: Array<FindOption>,
    public goals: Array<GoalExp>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const goals = this.goals.map((goal) => GoalExps.evaluateGoalExp(mod, goal))
    const solver = Solver.start(this.pattern, goals)
    const solutions = solver.solve(mod, buildSolveOptions(this.options))
    return formatSolutions(solutions, this.pattern)
  }
}

function formatSolutions(
  solutions: Array<Solution>,
  pattern: QueryPattern,
): string {
  switch (pattern["@kind"]) {
    case "QueryPatternNames": {
      const variables: Array<Exp> = pattern.names.map((name) =>
        Exps.PatternVar(name),
      )
      const exp = variables.reduceRight(
        (result, variable) => Exps.ArrayCons(variable, result),
        Exps.ArrayNull(),
      )
      const results = solutions.map((solution) =>
        formatReification(reify(solution, exp)),
      )
      return formatResults(results)
    }

    case "QueryPatternName": {
      const variable = Exps.PatternVar(pattern.name)
      const results = solutions.map((solution) =>
        formatReification(reify(solution, variable)),
      )
      return formatResults(results)
    }
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
