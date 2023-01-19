import { envMerge } from "../env"
import { evaluate, quote } from "../evaluate"
import { match } from "../match"
import { refresh } from "../refresh"
import type { Rule } from "../rule"
import { substitutionDeepWalk, substitutionEmpty } from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

export function rewriteOnePlace(rule: Rule, value: Value): Value | undefined {
  switch (rule["@kind"]) {
    case "Case": {
      const mod = rule.mod.copy()
      mod.env = envMerge(mod.env, rule.env)

      const renames = new Map()
      const from = refresh(mod, renames, quote(mod, mod.env, rule.from))
      const substitution = match(mod, substitutionEmpty(), from, value)

      if (substitution === undefined) {
        return undefined
      }

      for (const [name, variable] of renames.entries()) {
        mod.define(name, substitutionDeepWalk(substitution, variable))
      }

      if (rule.guard !== undefined) {
        const ok = evaluate(mod, mod.env, rule.guard)
        Values.assertValue(ok, "Boolean", { who: "rewriteOneStep" })
        if (!ok.data) {
          return undefined
        }
      }

      const to = refresh(mod, renames, quote(mod, mod.env, rule.to))
      return substitutionDeepWalk(substitution, to)
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
