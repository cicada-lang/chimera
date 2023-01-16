import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"

// NOTE Do side effect on `occurredPropagations`.

export function hyperrewrite(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
  occurredPropagations: Array<[Hyperrule, Array<Value>]>,
): Array<Value> {
  while (true) {
    const result = hyperrewriteOneStep(
      mod,
      hyperrule,
      values,
      occurredPropagations,
    )

    if (result === undefined) {
      return values
    }

    values = result
  }
}
