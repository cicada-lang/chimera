import { indent } from "../../../utils/indent"
import * as Exps from "../../exp"
import { Exp, formatExp } from "../../exp"
import { reify, Substitution } from "../../substitution"
import type { QueryPattern } from "../find"

export function formatSubstitutionForQueryPattern(
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
