import { rewrite } from "../rewrite"
import type * as Values from "../value"
import type { Value } from "../value"
import { assertArity } from "./assertArity"

export function applyRule(target: Values.Rule, args: Array<Value>): Value {
  assertArity(args, 1, { who: "applyRule" })

  return rewrite(target.rule, args[0])
}
