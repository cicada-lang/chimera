import type { Value } from "../value"

export type Rule = Case | List

export type Case = {
  "@type": "Rule"
  "@kind": "Case"
  from: Value
  to: Value
}

export function Case(from: Value, to: Value): Case {
  return {
    "@type": "Rule",
    "@kind": "Case",
    from,
    to,
  }
}

export type List = {
  "@type": "Rule"
  "@kind": "List"
  rules: Array<Rule>
}

export function List(rules: Array<Rule>): List {
  return {
    "@type": "Rule",
    "@kind": "List",
    rules,
  }
}
