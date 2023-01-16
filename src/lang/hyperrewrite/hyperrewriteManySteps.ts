import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"

// NOTE Do side effect on `occurredPropagations`.

export function hyperrewriteManySteps(
  mod: Mod,
  limit: number,
  hyperrule: Hyperrule,
  values: Array<Value>,
  appliedPropagations: Array<[Hyperrule, Array<Value>]> = [],
): Array<Array<Value>> {
  const results = [values]
  while (results.length < limit) {
    const result = hyperrewriteOneStep(
      mod,
      hyperrule,
      values,
      appliedPropagations,
    )
    if (result === undefined) {
      return results
    }

    results.push(result)
    values = result
  }

  return results
}
