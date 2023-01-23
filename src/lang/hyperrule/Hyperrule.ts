import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"

export type Hyperrule = Simplify | Propagate | List

export type Simplify = {
  "@type": "Hyperrule"
  "@kind": "Simplify"
  mod: Mod
  env: Env
  pattern: Exp
  stmts: Array<Stmt>
}

export function Simplify(
  mod: Mod,
  env: Env,
  pattern: Exp,
  stmts: Array<Stmt>,
): Simplify {
  return {
    "@type": "Hyperrule",
    "@kind": "Simplify",
    mod,
    env,
    pattern,
    stmts,
  }
}

export type Propagate = {
  "@type": "Hyperrule"
  "@kind": "Propagate"
  mod: Mod
  env: Env
  pattern: Exp
  stmts: Array<Stmt>
}

export function Propagate(
  mod: Mod,
  env: Env,
  pattern: Exp,
  stmts: Array<Stmt>,
): Propagate {
  return {
    "@type": "Hyperrule",
    "@kind": "Propagate",
    mod,
    env,
    pattern,
    stmts,
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
