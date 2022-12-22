import type { Exp } from "../exp"
import type { Span } from "../span"

export type RewriteRuleExp = Case | List

export type Case = {
  "@type": "RewriteRuleExp"
  "@kind": "Case"
  from: Exp
  to: Exp
  span: Span
}

export function Case(from: Exp, to: Exp, span: Span): Case {
  return {
    "@type": "RewriteRuleExp",
    "@kind": "Case",
    from,
    to,
    span,
  }
}

export type List = {
  "@type": "RewriteRuleExp"
  "@kind": "List"
  rules: Array<RewriteRuleExp>
  span: Span
}

export function List(rules: Array<RewriteRuleExp>, span: Span): List {
  return {
    "@type": "RewriteRuleExp",
    "@kind": "List",
    rules,
    span,
  }
}
