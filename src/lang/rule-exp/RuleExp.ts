import type { Exp } from "../exp"
import type { Span } from "../span"
import type { Stmt } from "../stmt"

export type RuleExp = Case | List | Use

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

export type Use = {
  "@type": "RuleExp"
  "@kind": "Use"
  exp: Exp
  span: Span
}

export function Use(exp: Exp, span: Span): Use {
  return {
    "@type": "RuleExp",
    "@kind": "Use",
    exp,
    span,
  }
}
