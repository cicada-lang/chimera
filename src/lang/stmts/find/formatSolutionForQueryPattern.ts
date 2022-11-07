import * as Exps from "../../exp"
import { Exp, formatExp } from "../../exp"
import { reify, Solution } from "../../solution"
import { QueryPattern } from "../find"

export function formatSolutionForQueryPattern(
  solutions: Array<Solution>,
  pattern: QueryPattern,
): string {
  switch (pattern.kind) {
    case "QueryPatternNames": {
      const variables: Array<Exp> = pattern.names.map((name) =>
        Exps.PatternVar(name),
      )
      const list = variables.reduceRight(
        (result, variable) => Exps.ListCons(variable, result),
        Exps.ListNull(),
      )
      const results = solutions.map((solution) =>
        formatExp(reify(solution, list)),
      )
      return formatResults(results)
    }

    case "QueryPatternName": {
      const variable = Exps.PatternVar(pattern.name)
      const results = solutions.map((solution) =>
        formatExp(reify(solution, variable)),
      )
      return formatResults(results)
    }
  }
}

function formatResults(results: Array<string>): string {
  return results.length === 0 ? "[]" : `[ ${results.join(", \n  ")} ]`
}
