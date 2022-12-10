import { indent } from "../../../utils/indent"
import type { Mod } from "../../mod"
import { formatReification, reify } from "../../reify"
import type { Solution } from "../../solution"
import type { Value } from "../../value"
import * as Values from "../../value"

export function formatFoundVariable(
  mod: Mod,
  solutions: Array<Solution>,
  variable: Values.PatternVar,
): string {
  return formatResults(
    solutions.map((solution) =>
      formatReification(reify(mod, solution, variable)),
    ),
  )
}

export function formatFoundVariables(
  mod: Mod,
  solutions: Array<Solution>,
  variables: Array<Values.PatternVar>,
): string {
  const value = variables.reduceRight<Value>(
    (result, variable) => Values.ArrayCons(variable, result),
    Values.ArrayNull(),
  )

  return formatResults(
    solutions.map((solution) => formatReification(reify(mod, solution, value))),
  )
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
