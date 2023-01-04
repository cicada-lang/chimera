import type { Exp } from "../exp"
import type { Span } from "../span"

export type HyperruleExp = Case | List

export type Case = {
  "@type": "HyperruleExp"
  "@kind": "Case"
  from: Array<Exp>
  to: Array<Exp>
  span: Span
}

export function Case(from: Array<Exp>, to: Array<Exp>, span: Span): Case {
  return {
    "@type": "HyperruleExp",
    "@kind": "Case",
    from,
    to,
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
