import type { Env } from "../env"
import { envLookupValue } from "../env"
import type { Mod } from "../mod"
import type { Value } from "../value"

export function lookup(mod: Mod, env: Env, name: string): Value | undefined {
  const local = envLookupValue(env, name)
  if (local !== undefined) return local

  const value = envLookupValue(mod.env, name)
  if (value !== undefined) return value
}
