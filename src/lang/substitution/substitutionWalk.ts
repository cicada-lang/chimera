import { substitutionLookup, type Substitution } from "../substitution/index.js"
import { type Value } from "../value/index.js"

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
