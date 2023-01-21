import * as pt from "@cicada-lang/partech"
import * as matchers from "."
import type { RuleExp } from "../../rule-exp"
import * as RuleExps from "../../rule-exp"

export function rule_matcher(tree: pt.Tree): RuleExp {
  return pt.matcher<RuleExp>({
    "rule:case": ({ from, to }, { span }) =>
      RuleExps.Case(
        matchers.exp_matcher(from),
        matchers.exp_matcher(to),
        undefined,
        span,
      ),
    "rule:case_guard": ({ from, to, guard }, { span }) =>
      RuleExps.Case(
        matchers.exp_matcher(from),
        matchers.exp_matcher(to),
        matchers.exp_matcher(guard),
        span,
      ),
    "rule:use": ({ exp }, { span }) =>
      RuleExps.Use(matchers.exp_matcher(exp), span),
  })(tree)
}

export function rules_matcher(tree: pt.Tree): Array<RuleExp> {
  return pt.matcher({
    "rules:rules": ({ rules }) =>
      pt.matchers.zero_or_more_matcher(rules).map(rule_matcher),
  })(tree)
}
