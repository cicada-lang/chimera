import type { Env } from "../env"
import { hyperrewrite } from "../hyperrewrite"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"
import { assertArity } from "./assertArity"

export function applyHyperrule(
  mod: Mod,
  env: Env,
  target: Values.Hyperrule,
  args: Array<Value>,
): Value {
  assertArity(args, 1, { who: "applyHyperrule" })

  return Values.fromArray(
    hyperrewrite(mod, target.hyperrule, Values.toArray(args[0])),
  )
}
