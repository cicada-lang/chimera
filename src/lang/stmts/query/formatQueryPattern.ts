import { formatVariable, formatVariables, Solution } from "../../solution"
import { QueryPattern } from "../query"

export function formatQueryPattern(solutions: Array<Solution>, pattern: QueryPattern): string {
  switch (pattern.kind) {
    case "QueryPatternNames": {
      const results = solutions.map((solution) => formatVariables(solution, pattern.names))
      return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
    }

    case "QueryPatternName": {
      const results = solutions.map((solution) => formatVariable(solution, pattern.name))
      return results.length === 0 ? "[]" : `[ ${results.join(", ")} ]`
    }
  }
}
