import { Substitution, substitutionLookup } from "../substitution"
import type { Value } from "../value"

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
