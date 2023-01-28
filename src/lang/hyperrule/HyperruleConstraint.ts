import type { Hyperrule } from "../hyperrule"
import type { Value } from "../value"

export type HyperruleConstraint = {
  hyperrule: Hyperrule
  value: Value
}

export function HyperruleConstraint(
  hyperrule: Hyperrule,
  value: Value,
): HyperruleConstraint {
  return {
    hyperrule,
    value,
  }
}
