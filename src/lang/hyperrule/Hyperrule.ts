import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"

export type Hyperrule = Simplify | Propagate | List

export type Simplify = {
  "@type": "Hyperrule"
  "@kind": "Simplify"
  mod: Mod
  env: Env
  from: Array<Exp>
  to: Array<Exp>
  guard: Exp | undefined
}

export function Simplify(
  mod: Mod,
  env: Env,
  from: Array<Exp>,
  to: Array<Exp>,
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

export type Propagate = {
  "@type": "Hyperrule"
  "@kind": "Propagate"
  mod: Mod
  env: Env
  from: Array<Exp>
  to: Array<Exp>
  guard: Exp | undefined
}

export function Propagate(
  mod: Mod,
  env: Env,
  from: Array<Exp>,
  to: Array<Exp>,
  guard: Exp | undefined,
): Propagate {
  return {
    "@type": "Hyperrule",
    "@kind": "Propagate",
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
