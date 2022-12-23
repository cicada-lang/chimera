import type { Exp } from "../exp"
import type { Span } from "../span"

export type RewriteRuleExp = Case | Call | List

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

export type Call = {
  "@type": "RewriteRuleExp"
  "@kind": "Call"
  exp: Exp
  span: Span
}

export function Call(exp: Exp, span: Span): Call {
  return {
    "@type": "RewriteRuleExp",
    "@kind": "Call",
    exp,
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
