import { equalValues } from "../equal"
import type { Hyperrule } from "../hyperrule"
import { match } from "../match"
import type { Mod } from "../mod"
import type { Substitution } from "../substitution"
import type { Value } from "../value"
import { permuteByGroup } from "./permuteByGroup"

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
  for (const permutedValues of permuteByGroup(values)) {
    const result = propagateOrdered(
      mod,
      substitution,
      patterns,
      permutedValues,
      appliedPropagations,
      [],
    )

    if (result !== undefined) {
      const propagation = Propagation(hyperrule, result.matchedValues)
      if (propagationOccurred(propagation, appliedPropagations)) {
        return undefined
      }

      appliedPropagations.push(propagation)
      return result
    }
  }

  return undefined
}

function propagationOccurred(
  target: Propagation,
  propagations: Array<Propagation>,
): boolean {
  return propagations.some(
    (propagation) =>
      target.hyperrule === propagation.hyperrule &&
      equalValues(target.values, propagation.values),
  )
}

function propagateOrdered(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
  appliedPropagations: Array<Propagation>,
  matchedValues: Array<Value>,
): undefined | { substitution: Substitution; matchedValues: Array<Value> } {
  if (patterns.length === 0) {
    return {
      substitution,
      matchedValues,
    }
  }

  const [pattern, ...restPatterns] = patterns

  for (const [index, value] of values.entries()) {
    const newSubstitution = match(substitution, pattern, value)
    if (newSubstitution !== undefined) {
      return propagateOrdered(
        mod,
        newSubstitution,
        restPatterns,
        [...values.slice(0, index), ...values.slice(index + 1)],
        appliedPropagations,
        [...matchedValues, value],
      )
    }
  }

  return undefined
}
