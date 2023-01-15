import type { Env } from "../env"
import { quote } from "../evaluate"
import type { Mod } from "../mod"
import type { Rule } from "../rule"
import * as Rules from "../rule"
import type { RuleExp } from "../rule-exp"

export function evaluateRuleExp(mod: Mod, env: Env, rule: RuleExp): Rule {
  switch (rule["@kind"]) {
    case "Case": {
      return Rules.Case(
        mod,
        env,
        quote(mod, env, rule.from),
        quote(mod, env, rule.to),
      )
    }

    case "List": {
      return Rules.List(
        rule.rules.map((rule) => evaluateRuleExp(mod, env, rule)),
      )
    }
  }
}
