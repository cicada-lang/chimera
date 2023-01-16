import { match } from "../match"
import type { Mod } from "../mod"
import type { Substitution } from "../substitution"
import type { Value } from "../value"
import { permutation } from "./permutation"

// TODO We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

export function simplify(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; values: Array<Value> } {
  for (const permutedValues of permutation(values)) {
    const result = simplifyOrdered(mod, substitution, patterns, permutedValues)
    if (result !== undefined) {
      return result
    }
  }

  return undefined
}

function simplifyOrdered(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; values: Array<Value> } {
  if (patterns.length === 0) {
    return {
      substitution,
      values,
    }
  }

  const [pattern, ...restPatterns] = patterns

  for (const [index, value] of values.entries()) {
    const newSubstitution = match(mod, substitution, pattern, value)
    if (newSubstitution !== undefined) {
      return simplifyOrdered(mod, newSubstitution, restPatterns, [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ])
    }
  }

  return undefined
}
