import type { Value } from "../value"

export type RewriteRule = Case | List

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
