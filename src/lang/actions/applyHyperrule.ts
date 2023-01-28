import * as Goals from "../goal"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyHyperrule(
  target: Values.Hyperrule,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyHyperrule" })

  return Values.Goal(Goals.Apply(target, args))
}
