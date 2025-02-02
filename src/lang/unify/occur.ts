import { substitutionWalk, type Substitution } from "../substitution/index.ts"
import type { Value } from "../value/index.ts"

export function occur(
  substitution: Substitution,
  name: String,
  value: Value,
): boolean {
  value = substitutionWalk(substitution, value)

  switch (value["@kind"]) {
    case "PatternVar": {
      return value.name === name
    }

    case "ListCons": {
      return (
        occur(substitution, name, value.car) ||
        occur(substitution, name, value.cdr)
      )
    }

    case "Objekt": {
      return (
        Object.values(value.properties).some((property) =>
          occur(substitution, name, property),
        ) || Boolean(value.etc && occur(substitution, name, value.etc))
      )
    }

    case "Term": {
      return value.args.some((arg) => occur(substitution, name, arg))
    }

    default: {
      return false
    }
  }
}
