import { catchReturnValue } from "../actions/catchReturnValue"
import { defineRenames } from "../actions/defineRenames"
import { envMerge } from "../env"
import { match } from "../match"
import { quote } from "../quote"
import { refresh } from "../refresh"
import type { Rule } from "../rule"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"

export function rewriteOnePlace(rule: Rule, value: Value): Value | undefined {
  switch (rule["@kind"]) {
    case "Case": {
      const mod = rule.mod.copy()
      mod.env = envMerge(mod.env, rule.env)

      const renames = new Map()
      const pattern = refresh(renames, quote(mod, mod.env, rule.pattern))
      const substitution = match(substitutionEmpty(), pattern, value)

      if (substitution === undefined) {
        return undefined
      }

      defineRenames(mod, renames, substitution)
      const returnValue = catchReturnValue(mod, rule.stmts)

      if (returnValue["@kind"] === "Null") {
        return undefined
      }

      return substitutionDeepWalk(substitution, refresh(renames, returnValue))
    }

    case "List": {
      for (const subRule of rule.rules) {
        const result = rewriteOnePlace(subRule, value)
        if (result !== undefined) {
          return result
        }
      }

      return undefined
    }
  }
}
