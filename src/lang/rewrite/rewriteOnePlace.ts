import { Env, envMerge } from "../env"
import { evaluate } from "../evaluate"
import type { Exp } from "../exp"
import { match } from "../match"
import type { Mod } from "../mod"
import { refresh } from "../refresh"
import type { Rule } from "../rule"
import {
  Substitution,
  substitutionDeepWalk,
  substitutionEmpty,
} from "../substitution"
import type { Value } from "../value"
import * as Values from "../value"

export function rewriteOnePlace(
  mod: Mod,
  rule: Rule,
  value: Value,
): Value | undefined {
  switch (rule["@kind"]) {
    case "Case": {
      const renames = new Map()
      const from = refresh(mod, renames, rule.from)
      const substitution = match(mod, substitutionEmpty(), from, value)

      if (substitution === undefined) {
        return undefined
      }

      if (
        rule.guard !== undefined &&
        guardReject(rule.mod, rule.env, rule.guard, substitution, renames)
      ) {
        return undefined
      }

      const to = refresh(mod, renames, rule.to)
      return substitutionDeepWalk(substitution, to)
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

export function guardReject(
  mod: Mod,
  env: Env,
  guard: Exp,
  substitution: Substitution,
  renames: Map<string, Values.PatternVar>,
): boolean {
  mod = mod.copy()
  mod.env = envMerge(mod.env, env)

  for (const [name, variable] of renames.entries()) {
    mod.define(name, substitutionDeepWalk(substitution, variable))
  }

  const ok = evaluate(mod, mod.env, guard)
  Values.assertValue(ok, "Boolean", { who: "guardReject" })
  return !ok.data
}
