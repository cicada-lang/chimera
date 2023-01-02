import type { Exp } from "../exp"
import type { Span } from "../span"

export type RuleExp = Case | Call | List

export type Case = {
  "@type": "RuleExp"
  "@kind": "Case"
  from: Exp
  to: Exp
  span: Span
}

export function Case(from: Exp, to: Exp, span: Span): Case {
  return {
    "@type": "RuleExp",
    "@kind": "Case",
    from,
    to,
    span,
  }
}

export type Call = {
  "@type": "RuleExp"
  "@kind": "Call"
  exp: Exp
  span: Span
}

export function Call(exp: Exp, span: Span): Call {
  return {
    "@type": "RuleExp",
    "@kind": "Call",
    exp,
    span,
  }
}

export type List = {
  "@type": "RuleExp"
  "@kind": "List"
  rules: Array<RuleExp>
  span: Span
}

export function List(rules: Array<RuleExp>, span: Span): List {
  return {
    "@type": "RuleExp",
    "@kind": "List",
    rules,
    span,
  }
}
