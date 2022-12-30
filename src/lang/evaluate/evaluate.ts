import type { Env } from "../env"
import { quote } from "../evaluate"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  return quote(mod, env, exp)
}
