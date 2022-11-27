import { buildSolveOptions, FindOption, QueryPattern } from "."
import { indent } from "../../../utils/indent"
import * as Exps from "../../exp"
import { Exp, formatExp } from "../../exp"
import type { Mod } from "../../mod"
import { Solver } from "../../solver"
import type { Span } from "../../span"
import { Stmt } from "../../stmt"
import { reify, Substitution } from "../../substitution"

export class Find extends Stmt {
  constructor(
    public pattern: QueryPattern,
    public options: Array<FindOption>,
    public goals: Array<Exps.Goal>,
    public span?: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<string> {
    const goals = this.goals.map((goal) => Exps.evaluateGoal(mod, goal))
    const solver = Solver.start(this.pattern, goals)
    const substitutions = solver.solve(mod, buildSolveOptions(this.options))
    return formatSubstitutionForQueryPattern(substitutions, this.pattern)
  }
}

function formatSubstitutionForQueryPattern(
  substitutions: Array<Substitution>,
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
      const results = substitutions.map((substitution) =>
        formatExp(reify(substitution, exp)),
      )
      return formatResults(results)
    }

    case "QueryPatternName": {
      const variable = Exps.PatternVar(pattern.name)
      const results = substitutions.map((substitution) =>
        formatExp(reify(substitution, variable)),
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
