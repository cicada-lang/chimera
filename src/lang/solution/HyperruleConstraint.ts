import type * as Values from "../value"
import type { Value } from "../value"

export type HyperruleConstraint = {
  target: Values.Hyperrule
  values: Array<Value>
}

export function HyperruleConstraint(
  target: Values.Hyperrule,
  values: Array<Value>,
): HyperruleConstraint {
  return {
    target,
    values,
  }
}
