import * as Goals from "../goal/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"
import { assertArity } from "./assertArity.js"

export function applyTypeConstraint(
  target: Values.TypeConstraint,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyTypeConstraint" })

  return Values.Goal(Goals.Apply(target, args))
}
