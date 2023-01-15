import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Value } from "../value"

export type Hyperrule = Case | List

export type Case = {
  "@type": "Hyperrule"
  "@kind": "Case"
  mod: Mod
  env: Env
  from: Array<Value>
  to: Array<Value>
  guard: Exp | undefined
}

export function Case(
  mod: Mod,
  env: Env,
  from: Array<Value>,
  to: Array<Value>,
  guard: Exp | undefined,
): Case {
  return {
    "@type": "Hyperrule",
    "@kind": "Case",
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
