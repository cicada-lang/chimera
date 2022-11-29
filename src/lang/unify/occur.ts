import type { Exp } from "../exp/index.ts"
import { Substitution, substitutionWalk } from "../substitution/index.ts"

export function occur(
  substitution: Substitution,
  name: String,
  exp: Exp,
): boolean {
  exp = substitutionWalk(substitution, exp)

  switch (exp["@kind"]) {
    case "PatternVar": {
      return exp.name === name
    }

    case "ArrayCons": {
      return (
        occur(substitution, name, exp.car) || occur(substitution, name, exp.cdr)
      )
    }

    case "Objekt": {
      return Object.values(exp.properties).some((property) =>
        occur(substitution, name, property),
      )
    }

    case "Data": {
      return exp.args.some((arg) => occur(substitution, name, arg))
    }

    default: {
      return false
    }
  }
}
