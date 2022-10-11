import { formatVariable, Solution } from "../../solution"
import { QueryPattern } from "../query"

export function formatSolutionForQueryPattern(
  solutions: Array<Solution>,
  pattern: QueryPattern,
): string {
  switch (pattern.kind) {
    case "QueryPatternNames": {
      const results = solutions.map((solution) => {
        const results = pattern.names.map((name) => formatVariable(solution, name))
        return `[${results.join(", ")}]`
      })

      return formatResults(results)
    }

    case "QueryPatternName": {
      const results = solutions.map((solution) => formatVariable(solution, pattern.name))
      return formatResults(results)
    }
  }
}

function formatResults(results: Array<string>): string {
  return results.length === 0 ? "[]" : `[ ${results.join(", \n  ")} ]`
}
