import { envExtendFreshPatternVars } from "../env"
import { evaluate } from "../evaluate"
import { match } from "../match"
import type { Mod } from "../mod"
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
      const env = envExtendFreshPatternVars(rule.mod, rule.env, rule.vars)
      const from = evaluate(rule.mod, env, rule.from)
      const substitution = match(rule.mod, substitutionEmpty(), from, value)

      if (substitution !== undefined) {
        const to = evaluate(rule.mod, env, rule.to)
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
