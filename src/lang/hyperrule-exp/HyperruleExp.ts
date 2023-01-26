import type { Exp } from "../exp"
import type { Span } from "../span"
import type { Stmt } from "../stmt"

export type HyperruleExp = Simplify | Propagate | List | Include

export type Simplify = {
  "@type": "HyperruleExp"
  "@kind": "Simplify"
  pattern: Exp
  stmts: Array<Stmt>
  span: Span
}

export function Simplify(
  pattern: Exp,
  stmts: Array<Stmt>,
  span: Span,
): Simplify {
  return {
    "@type": "HyperruleExp",
    "@kind": "Simplify",
    pattern,
    stmts,
    span,
  }
}

export type Propagate = {
  "@type": "HyperruleExp"
  "@kind": "Propagate"
  pattern: Exp
  stmts: Array<Stmt>
  span: Span
}

export function Propagate(
  pattern: Exp,
  stmts: Array<Stmt>,
  span: Span,
): Propagate {
  return {
    "@type": "HyperruleExp",
    "@kind": "Propagate",
    pattern,
    stmts,
    span,
  }
}

export type List = {
  "@type": "HyperruleExp"
  "@kind": "List"
  hyperrules: Array<HyperruleExp>
  span: Span
}

export function List(hyperrules: Array<HyperruleExp>, span: Span): List {
  return {
    "@type": "HyperruleExp",
    "@kind": "List",
    hyperrules,
    span,
  }
}

export type Include = {
  "@type": "HyperruleExp"
  "@kind": "Include"
  exp: Exp
  span: Span
}

export function Include(exp: Exp, span: Span): Include {
  return {
    "@type": "HyperruleExp",
    "@kind": "Include",
    exp,
    span,
  }
}
