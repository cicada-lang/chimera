import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyTypeConstraint(
  mod: Mod,
  target: Values.TypeConstraint,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyTypeConstraint" })

  return Values.Boolean(target.predicate(args[0]))
}
