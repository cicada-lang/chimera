import type { Env } from "../env/index.js"
import { envLookupValue } from "../env/index.js"
import type { Mod } from "../mod/index.js"
import type { Value } from "../value/index.js"

export function lookup(mod: Mod, env: Env, name: string): Value | undefined {
  const local = envLookupValue(env, name)
  if (local !== undefined) return local

  const value = envLookupValue(mod.env, name)
  if (value !== undefined) return value
}
