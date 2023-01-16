import { match } from "../match"
import type { Mod } from "../mod"
import type { Substitution } from "../substitution"
import type { Value } from "../value"
import { permutationOfValues } from "./permutationOfValues"

// TODO We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

export function propagate(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; values: Array<Value> } {
  for (const permutedValues of permutationOfValues(values)) {
    const result = propagateOrdered(mod, substitution, patterns, permutedValues)
    if (result !== undefined) {
      return result
    }
  }

  return undefined
}

function propagateOrdered(
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
      return propagateOrdered(mod, newSubstitution, restPatterns, [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ])
    }
  }

  return undefined
}
