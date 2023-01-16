import type { Hyperrule } from "../hyperrule"
import { match } from "../match"
import type { Mod } from "../mod"
import type { Substitution } from "../substitution"
import type { Value } from "../value"
import { permutationOfValues } from "./permutationOfValues"

export type Propagation = {
  hyperrule: Hyperrule
  values: Array<Value>
}

export function Propagation(
  hyperrule: Hyperrule,
  values: Array<Value>,
): Propagation {
  return {
    hyperrule,
    values,
  }
}

export function propagate(
  mod: Mod,
  hyperrule: Hyperrule,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
  appliedPropagations: Array<Propagation>,
): undefined | { substitution: Substitution } {
  for (const permutedValues of permutationOfValues(values)) {
    const result = propagateOrdered(
      mod,
      substitution,
      patterns,
      permutedValues,
      appliedPropagations,
    )

    if (result !== undefined) {
      appliedPropagations.push(Propagation(hyperrule, values))
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
  appliedPropagations: Array<Propagation>,
): undefined | { substitution: Substitution } {
  if (patterns.length === 0) {
    return {
      substitution,
    }
  }

  const [pattern, ...restPatterns] = patterns

  for (const [index, value] of values.entries()) {
    const newSubstitution = match(mod, substitution, pattern, value)
    if (newSubstitution !== undefined) {
      return propagateOrdered(
        mod,
        newSubstitution,
        restPatterns,
        [...values.slice(0, index), ...values.slice(index + 1)],
        appliedPropagations,
      )
    }
  }

  return undefined
}
