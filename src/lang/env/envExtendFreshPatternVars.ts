import { Env, envExtend } from "../env"
import type { Mod } from "../mod"
import * as Values from "../value"

export function envExtendFreshPatternVars(
  mod: Mod,
  env: Env,
  names: Set<string>,
): Env {
  for (const name of names) {
    env = envExtend(env, name, Values.PatternVar(mod.freshen(name)))
  }

  return env
}
