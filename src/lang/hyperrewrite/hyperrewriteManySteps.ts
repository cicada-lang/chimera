import type { Hyperrule } from "../hyperrule"
import type { Value } from "../value"
import type { HyperrewriteContext } from "./hyperrewrite"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"
import type { Propagation } from "./propagate"

// NOTE Do side effect on `occurredPropagations`.

export function hyperrewriteManySteps(
  context: HyperrewriteContext,
  limit: number,
  hyperrule: Hyperrule,
  values: Array<Value>,
  appliedPropagations: Array<Propagation> = [],
): Array<Array<Value> | false> {
  const results: Array<Array<Value> | false> = [values]
  while (results.length < limit) {
    const result = hyperrewriteOneStep(
      context,
      hyperrule,
      values,
      appliedPropagations,
    )

    if (result === false) {
      results.push(false)
      return results
    }

    if (result === undefined) {
      return results
    }

    results.push(result)
    values = result
  }

  return results
}
