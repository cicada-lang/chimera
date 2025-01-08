import type { Env } from "../env/index.ts"
import { envLookupValue } from "../env/index.ts"
import type { Mod } from "../mod/index.ts"
import type { Value } from "../value/index.ts"

export function lookup(mod: Mod, env: Env, name: string): Value | undefined {
  const local = envLookupValue(env, name)
  if (local !== undefined) return local

  const value = envLookupValue(mod.env, name)
  if (value !== undefined) return value
}
