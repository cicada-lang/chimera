import type { Exp } from "../exp"
import type { Span } from "../span"

export type HyperruleExp = Simplify | Propagate | List

export type Simplify = {
  "@type": "HyperruleExp"
  "@kind": "Simplify"
  from: Array<Exp>
  to: Array<Exp>
  guard: Exp | undefined
  span: Span
}

export function Simplify(
  from: Array<Exp>,
  to: Array<Exp>,
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
  from: Array<Exp>
  to: Array<Exp>
  guard: Exp | undefined
  span: Span
}

export function Propagate(
  from: Array<Exp>,
  to: Array<Exp>,
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
