import { equal } from "../equal"
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

      if (valueArrayInclude(values, to)) {
        return undefined
      }

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

function valueArrayInclude(
  leftValues: Array<Value>,
  rightValues: Array<Value>,
): boolean {
  return rightValues.every((right) =>
    leftValues.some((left) => equal(left, right)),
  )
}

// TODO We have labelled edge, thus we should:
// - group by term name (label).
// - get the permutation of each group.
// - get the cartesian product of the permutations.

function hypermatch(
  mod: Mod,
  substitution: Substitution,
  patterns: Array<Value>,
  values: Array<Value>,
): undefined | { substitution: Substitution; values: Array<Value> } {
  for (const permuted of permutation(patterns)) {
    const result = hypermatchOrdered(mod, substitution, permuted, values)
    if (result !== undefined) {
      return result
    }
  }

  return undefined
}

function hypermatchOrdered(
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
      return hypermatchOrdered(mod, newSubstitution, restPatterns, [
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ])
    }
  }

  return undefined
}

// NOTE Code taken from: https://stackoverflow.com/a/37580979
// references:
// - http://homepage.math.uiowa.edu/~goodman/22m150.dir/2007/Permutation%20Generation%20Methods.pdf
// - http://homepage.math.uiowa.edu/~goodman/algebrabook.dir/algebrabook.html

function permutation<A>(input: Array<A>): Array<Array<A>> {
  let length = input.length
  let result = [input.slice()]
  let c = new Array(length).fill(0)
  let i = 1
  let k
  let p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = input[i]
      input[i] = input[k]
      input[k] = p
      ++c[i]
      i = 1
      result.push(input.slice())
    } else {
      c[i] = 0
      ++i
    }
  }

  return result
}
