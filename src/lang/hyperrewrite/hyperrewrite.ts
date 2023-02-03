import type { Hyperrule } from "../hyperrule"
import type { Solution } from "../solution"
import type { Value } from "../value"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"
import type { Propagation } from "./propagate"

// NOTE Do side effect on `appliedPropagations`.

export type HyperrewriteContext = {
  solution: Solution
}

export function hyperrewrite(
  context: HyperrewriteContext,
  hyperrule: Hyperrule,
  values: Array<Value>,
  appliedPropagations: Array<Propagation> = [],
): Array<Value> | false {
  while (true) {
    const result = hyperrewriteOneStep(
      context,
      hyperrule,
      values,
      appliedPropagations,
    )

    if (result === false) {
      return false
    }

    if (result === undefined) {
      return values
    }

    values = result
  }
}
