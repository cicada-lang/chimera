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
  rules: Array<Hyperrule>
}

export function List(rules: Array<Hyperrule>): List {
  return {
    "@type": "Hyperrule",
    "@kind": "List",
    rules,
  }
}
