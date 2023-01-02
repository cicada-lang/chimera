import type { Env } from "../env"
import * as Errors from "../errors"
import { evaluate, quote } from "../evaluate"
import type { Mod } from "../mod"
import type { Rule } from "../rule"
import * as Rules from "../rule"
import type { RuleExp } from "../rule-exp"

export function evaluateRuleExp(mod: Mod, env: Env, rule: RuleExp): Rule {
  switch (rule["@kind"]) {
    case "Case": {
      return Rules.Case(quote(mod, env, rule.from), quote(mod, env, rule.to))
    }

    case "Call": {
      const value = evaluate(mod, env, rule.exp)
      if (value["@kind"] !== "Rule") {
        throw new Errors.LangError(
          [
            `[evaluateRuleExp] expect the value to be Rule`,
            `  value["@kind"]: ${value["@kind"]}`,
          ].join("\n"),
        )
      }

      return value.rule
    }

    case "List": {
      return Rules.List(
        rule.rules.map((rule) => evaluateRuleExp(mod, env, rule)),
      )
    }
  }
}
