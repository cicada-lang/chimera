import * as Goals from "../goal"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyTypeConstraint(
  target: Values.TypeConstraint,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyTypeConstraint" })

  return Values.Goal(Goals.Apply(target, args))
}
