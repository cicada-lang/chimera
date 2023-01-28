import type { Hyperrule } from "../hyperrule"
import type { Value } from "../value"

export type HyperruleConstraint = {
  hyperrule: Hyperrule
  values: Array<Value>
}

export function HyperruleConstraint(
  hyperrule: Hyperrule,
  values: Array<Value>,
): HyperruleConstraint {
  return {
    hyperrule,
    values,
  }
}
