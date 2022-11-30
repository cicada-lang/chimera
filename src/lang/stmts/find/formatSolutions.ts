import { indent } from "../../../utils/indent"
import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import { formatReification, reify } from "../../reify"
import type { Solution } from "../../solution"
import type { QueryPattern } from "../find"

export function formatSolutions(
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
