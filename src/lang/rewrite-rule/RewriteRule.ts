import type { Value } from "../value"

export type RewriteRule = Case | List

/**

   A `RewriteRules.Case` will generates `PatternVar` from `vars`
   during application, because a term rewrite rule maybe
   applied to a term with `PatternVar` in it.

**/

export type Case = {
  "@type": "RewriteRule"
  "@kind": "Case"
  from: Value
  to: Value
}

export function Case(from: Value, to: Value): Case {
  return {
    "@type": "RewriteRule",
    "@kind": "Case",
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
