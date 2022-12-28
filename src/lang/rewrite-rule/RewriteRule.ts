import type { Env } from "../env"
import type { Exp } from "../exp"
import type { Mod } from "../mod"

export type RewriteRule = Case | List

/**

   A `RewriteRules.Case` will generates `PatternVar` from `vars`
   during application, because a term rewrite rule maybe
   applied to a term with `PatternVar` in it.

**/

export type Case = {
  "@type": "RewriteRule"
  "@kind": "Case"
  mod: Mod
  env: Env
  vars: Set<string>
  from: Exp
  to: Exp
}

export function Case(
  mod: Mod,
  env: Env,
  vars: Set<string>,
  from: Exp,
  to: Exp,
): Case {
  return {
    "@type": "RewriteRule",
    "@kind": "Case",
    mod,
    env,
    vars,
    from,
    to,
  }
}

export type List = {
  "@type": "RewriteRule"
  "@kind": "List"
  rules: Array<RewriteRule>
}

export function List(rules: Array<RewriteRule>): List {
  return {
    "@type": "RewriteRule",
    "@kind": "List",
    rules,
  }
}
