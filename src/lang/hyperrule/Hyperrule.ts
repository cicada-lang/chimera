import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"

export type Hyperrule = Simplify | List

export type Simplify = {
  "@type": "Hyperrule"
  "@kind": "Simplify"
  mod: Mod
  env: Env
  from: Array<Value>
  to: Array<Value>
  guard: Exp | undefined
}

export function Simplify(
  mod: Mod,
  env: Env,
  from: Array<Value>,
  to: Array<Value>,
  guard: Exp | undefined,
): Simplify {
  return {
    "@type": "Hyperrule",
    "@kind": "Simplify",
    mod,
    env,
    from,
    to,
    guard,
  }
}

export type List = {
  "@type": "Hyperrule"
  "@kind": "List"
  hyperrules: Array<Hyperrule>
}

export function List(hyperrules: Array<Hyperrule>): List {
  return {
    "@type": "Hyperrule",
    "@kind": "List",
    hyperrules,
  }
}
