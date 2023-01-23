import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"
import type { Stmt } from "../stmt"

export type Rule = Case | List

export type Case = {
  "@type": "Rule"
  "@kind": "Case"
  mod: Mod
  env: Env
  pattern: Exp
  stmts: Array<Stmt>
}

export function Case(
  mod: Mod,
  env: Env,
  pattern: Exp,
  stmts: Array<Stmt>,
): Case {
  return {
    "@type": "Rule",
    "@kind": "Case",
    mod,
    env,
    pattern,
    stmts,
  }
}

export type List = {
  "@type": "Rule"
  "@kind": "List"
  rules: Array<Rule>
}

export function List(rules: Array<Rule>): List {
  return {
    "@type": "Rule",
    "@kind": "List",
    rules,
  }
}
