import type { RewriteRuleExp } from "../rewrite-rule-exp"
import type { VarCollection } from "../var-collection"
import { varCollectionFromExp, varCollectionMerge } from "../var-collection"

export function varCollectionFromRewriteRuleExp(
  rule: RewriteRuleExp,
): VarCollection {
  switch (rule["@kind"]) {
    case "Case": {
      return varCollectionMerge([
        varCollectionFromExp(rule.from),
        varCollectionFromExp(rule.to),
      ])
    }

    case "Call": {
      // NOTE Should not collect the `exp` of `RewriteRuleExp.Call`.
      return varCollectionMerge([])
    }

    case "List": {
      return varCollectionMerge(rule.rules.map(varCollectionFromRewriteRuleExp))
    }
  }
}
