import type { Env } from "../env"
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
}

export function Case(
  mod: Mod,
  env: Env,
  from: Array<Value>,
  to: Array<Value>,
): Case {
  return {
    "@type": "Hyperrule",
    "@kind": "Case",
    mod,
    env,
    from,
    to,
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
