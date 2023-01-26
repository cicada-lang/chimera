import type { Exp } from "../exp"
import type { Span } from "../span"
import type { Stmt } from "../stmt"

export type RuleExp = Case | List | Include

export type Case = {
  "@type": "RuleExp"
  "@kind": "Case"
  pattern: Exp
  stmts: Array<Stmt>
  span: Span
}

export function Case(pattern: Exp, stmts: Array<Stmt>, span: Span): Case {
  return {
    "@type": "RuleExp",
    "@kind": "Case",
    pattern,
    stmts,
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

export type Include = {
  "@type": "RuleExp"
  "@kind": "Include"
  exp: Exp
  span: Span
}

export function Include(exp: Exp, span: Span): Include {
  return {
    "@type": "RuleExp",
    "@kind": "Include",
    exp,
    span,
  }
}
