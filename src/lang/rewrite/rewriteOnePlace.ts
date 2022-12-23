import type { Mod } from "../mod"
import type { RewriteRule } from "../rewrite-rule"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import { unify } from "../unify"
import type { Value } from "../value"

export function rewriteOnePlace(
  mod: Mod,
  rule: RewriteRule,
  value: Value,
): Value | undefined {
  switch (rule["@kind"]) {
    case "Case": {
      const substitution = unify(mod, substitutionEmpty(), rule.from, value)
      if (substitution !== undefined) {
        return substitutionDeepWalk(substitution, rule.to)
      }

      return undefined
    }

    case "List": {
      for (const subRule of rule.rules) {
        const result = rewriteOnePlace(mod, subRule, value)
        if (result !== undefined) {
          return result
        }
      }

      return undefined
    }
  }
}
