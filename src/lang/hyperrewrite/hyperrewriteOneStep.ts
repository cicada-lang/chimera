import type { Hyperrule } from "../hyperrule"
import { match } from "../match"
import type { Mod } from "../mod"
import { refresh } from "../refresh"
import { guardReject } from "../rewrite"
import type { Substitution } from "../substitution"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"

export function hyperrewriteOneStep(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
): Array<Value> | undefined {
  switch (hyperrule["@kind"]) {
    case "Case": {
      const renames = new Map()
      const from = hyperrule.from.map((value) => refresh(mod, renames, value))
      const result = hypermatch(mod, substitutionEmpty(), from, values)

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

function hypermatch(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; values: Array<Value> } {
  if (patterns.length === 0)
    return {
      substitution,
      values,
    }

  const [pattern, ...restPatterns] = patterns

  for (const [index, value] of values.entries()) {
    const newSubstitution = match(mod, substitution, pattern, value)
    if (newSubstitution !== undefined) {
      return hypermatch(mod, newSubstitution, restPatterns, [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ])
    }
  }

  return undefined
}
