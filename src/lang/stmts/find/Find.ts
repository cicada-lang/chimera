import { buildSolveOptions, FindOption, QueryPattern } from "."
import { indent } from "../../../utils/indent"
import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import type { GoalExp } from "../../goal-exp"
import * as GoalExps from "../../goal-exp"
import type { Mod } from "../../mod"
import { formatReification, reify } from "../../reify"
import type { Solution } from "../../solution"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"

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
  const body = results.map((result) => indent(result)).join(",\n")
  return `[ \n${body}\n]`
}
