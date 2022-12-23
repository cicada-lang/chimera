import type { Env } from "../env"
import { envExtendFreshPatternVars } from "../env"
import { evaluate } from "../evaluate"
import type { Mod } from "../mod"
import type { RewriteRule } from "../rewrite-rule"
import * as RewriteRules from "../rewrite-rule"
import type { RewriteRuleExp } from "../rewrite-rule-exp"
import { collectVarsFromExp } from "../value"

export function evaluateRewriteRuleExp(
  mod: Mod,
  env: Env,
  rule: RewriteRuleExp,
): RewriteRule {
  switch (rule["@kind"]) {
    case "Case": {
      const vars = new Set([
        ...collectVarsFromExp(rule.from),
        ...collectVarsFromExp(rule.to),
      ])

      env = envExtendFreshPatternVars(mod, env, vars)

      return RewriteRules.Case(
        evaluate(mod, env, rule.from),
        evaluate(mod, env, rule.to),
      )
    }

    case "List": {
      return RewriteRules.List(
        rule.rules.map((rule) => evaluateRewriteRuleExp(mod, env, rule)),
      )
    }
  }
}
