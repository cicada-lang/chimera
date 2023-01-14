import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import type * as Values from "../value"
import type { Value } from "../value"
import { assertArity } from "./assertArity"

export function applyRule(
  mod: Mod,
  target: Values.Rule,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyRule" })

  return rewrite(mod, target.rule, args[0])
}
