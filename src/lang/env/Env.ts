import Immutable from "immutable"

import type { Value } from "../value/index.js"

export type Env = Immutable.Map<string, Value>

export function envEmpty(): Env {
  return Immutable.Map()
}

export function envExtend(env: Env, name: string, value: Value): Env {
  return env.set(name, value)
}

export function envMerge(env: Env, env2: Env): Env {
  return env.concat(env2)
}

export function envLookupValue(env: Env, name: string): Value | undefined {
  return env.get(name)
}

export function envNames(env: Env): Array<string> {
  return Array.from(env.keys())
}

export function envEntries(env: Env): Array<[string, Value]> {
  return Array.from(env.entries())
}
