import { substitutionLookup, type Substitution } from "../substitution/index.ts"
import { type Value } from "../value/index.ts"

export function substitutionWalk(
  substitution: Substitution,
  value: Value,
): Value {
  while (value["@kind"] === "PatternVar") {
    const found = substitutionLookup(substitution, value.name)
    if (found === undefined) return value
    value = found
  }

  return value
}
