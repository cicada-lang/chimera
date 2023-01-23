import type { Exp } from "../exp"
import type { Span } from "../span"

export type HyperruleExp = Simplify | Propagate | List | Use

export type Simplify = {
  "@type": "HyperruleExp"
  "@kind": "Simplify"
  from: Exp
  to: Exp
  guard: Exp | undefined
  span: Span
}

export function Simplify(
  from: Exp,
  to: Exp,
  guard: Exp | undefined,
  span: Span,
): Simplify {
  return {
    "@type": "HyperruleExp",
    "@kind": "Simplify",
    from,
    to,
    guard,
    span,
  }
}

export type Propagate = {
  "@type": "HyperruleExp"
  "@kind": "Propagate"
  from: Exp
  to: Exp
  guard: Exp | undefined
  span: Span
}

export function Propagate(
  from: Exp,
  to: Exp,
  guard: Exp | undefined,
  span: Span,
): Propagate {
  return {
    "@type": "HyperruleExp",
    "@kind": "Propagate",
    from,
    to,
    guard,
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

export type Use = {
  "@type": "HyperruleExp"
  "@kind": "Use"
  exp: Exp
  span: Span
}

export function Use(exp: Exp, span: Span): Use {
  return {
    "@type": "HyperruleExp",
    "@kind": "Use",
    exp,
    span,
  }
}
