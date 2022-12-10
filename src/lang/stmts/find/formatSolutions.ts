import { indent } from "../../../utils/indent"
import type { Mod } from "../../mod"
import { formatReification, reify } from "../../reify"
import type { Solution } from "../../solution"
import type { Value } from "../../value"
import * as Values from "../../value"
import type { QueryPattern } from "../find"

export function formatSolutions(
  mod: Mod,
  solutions: Array<Solution>,
  pattern: QueryPattern,
): string {
  switch (pattern["@kind"]) {
    case "QueryPatternNames": {
      const variables: Array<Value> = pattern.names.map((name) =>
        Values.PatternVar(name),
      )
      const value = variables.reduceRight(
        (result, variable) => Values.ArrayCons(variable, result),
        Values.ArrayNull(),
      )
      const results = solutions.map((solution) =>
        formatReification(reify(mod, solution, value)),
      )
      return formatResults(results)
    }

    case "QueryPatternName": {
      const variable = Values.PatternVar(pattern.name)
      const results = solutions.map((solution) =>
        formatReification(reify(mod, solution, variable)),
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
