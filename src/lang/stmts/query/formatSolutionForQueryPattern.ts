import { reify, Solution } from "../../solution"
import * as Values from "../../value"
import { formatValue, Value } from "../../value"
import { QueryPattern } from "../query"

export function formatSolutionForQueryPattern(
  solutions: Array<Solution>,
  pattern: QueryPattern,
): string {
  switch (pattern.kind) {
    case "QueryPatternNames": {
      const variables: Array<Value> = pattern.names.map(Values.PatternVar)
      const list = variables.reduceRight(
        (result, variable) => Values.ListCons(variable, result),
        Values.ListNull(),
      )
      const results = solutions.map((solution) => formatValue(reify(solution, list)))
      return formatResults(results)
    }

    case "QueryPatternName": {
      const variable = Values.PatternVar(pattern.name)
      const results = solutions.map((solution) => formatValue(reify(solution, variable)))
      return formatResults(results)
    }
  }
}

function formatResults(results: Array<string>): string {
  return results.length === 0 ? "[]" : `[ ${results.join(", \n  ")} ]`
}
