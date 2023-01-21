import { match } from "../match"
import type { Substitution } from "../substitution"
import type { Value } from "../value"
import { permuteByGroup } from "./permuteByGroup"

export function simplify(
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; remainValues: Array<Value> } {
  for (const permutedValues of permuteByGroup(values)) {
    const result = simplifyOrdered(substitution, patterns, permutedValues)
    if (result !== undefined) {
      return result
    }
  }

  return undefined
}

function simplifyOrdered(
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; remainValues: Array<Value> } {
  if (patterns.length === 0) {
    return {
      substitution,
      remainValues: values,
    }
  }

  const [pattern, ...restPatterns] = patterns

  for (const [index, value] of values.entries()) {
    const newSubstitution = match(substitution, pattern, value)
    if (newSubstitution !== undefined) {
      return simplifyOrdered(newSubstitution, restPatterns, [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ])
    }
  }

  return undefined
}
