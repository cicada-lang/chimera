import type { Value } from "../value"

export type Hyperrule = Case | List

export type Case = {
  "@type": "Hyperrule"
  "@kind": "Case"
  from: Array<Value>
  to: Array<Value>
}

export function Case(from: Array<Value>, to: Array<Value>): Case {
  return {
    "@type": "Hyperrule",
    "@kind": "Case",
    from,
    to,
  }
}

export type List = {
  "@type": "Hyperrule"
  "@kind": "List"
  hyperrules: Array<Hyperrule>
}

export function List(hyperrules: Array<Hyperrule>): List {
  return {
    "@type": "Hyperrule",
    "@kind": "List",
    hyperrules,
  }
}
