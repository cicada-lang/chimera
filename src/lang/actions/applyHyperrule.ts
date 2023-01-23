import { hyperrewrite } from "../hyperrewrite"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyHyperrule(
  target: Values.Hyperrule,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyHyperrule" })

  return Values.fromArray(
    hyperrewrite(target.hyperrule, Values.toArray(args[0])),
  )
}
