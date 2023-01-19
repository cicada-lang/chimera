import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"

export type Rule = Case | List

export type Case = {
  "@type": "Rule"
  "@kind": "Case"
  mod: Mod
  env: Env
  from: Exp
  to: Exp
  guard: Exp | undefined
}

export function Case(
  mod: Mod,
  env: Env,
  from: Exp,
  to: Exp,
  guard: Exp | undefined,
): Case {
  return {
    "@type": "Rule",
    "@kind": "Case",
    mod,
    env,
    from,
    to,
    guard,
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
