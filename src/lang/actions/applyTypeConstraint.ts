import * as Goals from "../goal/index.ts"
import type { Value } from "../value/index.ts"
import * as Values from "../value/index.ts"
import { assertArity } from "./assertArity.ts"

export function applyTypeConstraint(
  target: Values.TypeConstraint,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyTypeConstraint" })

  return Values.Goal(Goals.Apply(target, args))
}
