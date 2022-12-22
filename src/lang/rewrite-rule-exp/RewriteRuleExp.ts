import type { Exp } from "../exp"

export type RewriteRuleExp = Case | List

export type Case = {
  "@type": "RewriteRuleExp"
  "@kind": "Case"
  from: Exp
  to: Exp
}

export function Case(from: Exp, to: Exp): Case {
  return {
    "@type": "RewriteRuleExp",
    "@kind": "Case",
    from,
    to,
  }
}

export type List = {
  "@type": "RewriteRuleExp"
  "@kind": "List"
  rules: Array<RewriteRuleExp>
}

export function List(rules: Array<RewriteRuleExp>): List {
  return {
    "@type": "RewriteRuleExp",
    "@kind": "List",
    rules,
  }
}
