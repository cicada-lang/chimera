import type { Exp } from "../exp"
import type { Span } from "../span"

export type RuleExp = Case | List

export type Case = {
  "@type": "RuleExp"
  "@kind": "Case"
  from: Exp
  to: Exp
  guard: Exp | undefined
  span: Span
}

export function Case(
  from: Exp,
  to: Exp,
  guard: Exp | undefined,
  span: Span,
): Case {
  return {
    "@type": "RuleExp",
    "@kind": "Case",
    from,
    to,
    guard,
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
