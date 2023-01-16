import type { Hyperrule } from "../hyperrule"
import { match } from "../match"
import type { Mod } from "../mod"
import { refresh } from "../refresh"
import { guardReject } from "../rewrite"
import type { Substitution } from "../substitution"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"
import { permutation } from "./permutation"

export function hyperrewriteOneStep(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
): Array<Value> | undefined {
  switch (hyperrule["@kind"]) {
    case "Simplify":
    case "Propagate": {
      const renames = new Map()
      const from = hyperrule.from.map((value) => refresh(mod, renames, value))
      const result =
        hyperrule["@kind"] === "Simplify"
          ? simplify(mod, substitutionEmpty(), from, values)
          : simplify(mod, substitutionEmpty(), from, values)

      if (result === undefined) {
        return undefined
      }

      if (
        hyperrule.guard !== undefined &&
        guardReject(
          hyperrule.mod,
          hyperrule.env,
          hyperrule.guard,
          result.substitution,
          renames,
        )
      ) {
        return undefined
      }

      const to = hyperrule.to.map((value) =>
        substitutionDeepWalk(result.substitution, refresh(mod, renames, value)),
      )

      return [...result.values, ...to]
    }

    case "List": {
      for (const subHyperrule of hyperrule.hyperrules) {
        const results = hyperrewriteOneStep(mod, subHyperrule, values)
        if (results !== undefined) {
          return results
        }
      }

      return undefined
    }
  }
}

// TODO We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

function simplify(
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
