import { match } from "../match"
import type { Mod } from "../mod"
import { refresh } from "../refresh"
import type { RewriteRule } from "../rewrite-rule"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"

export function rewriteOnePlace(
  mod: Mod,
  rule: RewriteRule,
  value: Value,
): Value | undefined {
  switch (rule["@kind"]) {
    case "Case": {
      const renames = new Map()
      const from = refresh(mod, renames, rule.from)
      const substitution = match(mod, substitutionEmpty(), from, value)

      if (substitution !== undefined) {
        const to = refresh(mod, renames, rule.to)
        return substitutionDeepWalk(substitution, to)
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
