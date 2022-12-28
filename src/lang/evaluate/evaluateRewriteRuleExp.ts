import type { Env } from "../env"
import * as Errors from "../errors"
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

      return RewriteRules.Case(mod, env, vars, rule.from, rule.to)
    }

    case "Call": {
      const value = evaluate(mod, env, rule.exp)
      if (value["@kind"] !== "RewriteRule") {
        throw new Errors.LangError(
          [
            `[evaluateRewriteRuleExp] expect the value to be RewriteRule`,
            `  value["@kind"]: ${value["@kind"]}`,
          ].join("\n"),
        )
      }

      return value.rule
    }

    case "List": {
      return RewriteRules.List(
        rule.rules.map((rule) => evaluateRewriteRuleExp(mod, env, rule)),
      )
    }
  }
}
