import * as pt from "@cicada-lang/partech"
import * as matchers from "."
import type { RuleExp } from "../../rule-exp"
import * as RuleExps from "../../rule-exp"

export function rule_matcher(tree: pt.Tree): RuleExp {
  return pt.matcher<RuleExp>({
    "rule:case": ({ from, to }, { span }) =>
      RuleExps.Case(matchers.exp_matcher(from), matchers.exp_matcher(to), span),
    "rule:call": ({ exp }, { span }) =>
      RuleExps.Call(matchers.exp_matcher(exp), span),
  })(tree)
}

export function rules_matcher(tree: pt.Tree): Array<RuleExp> {
  return pt.matcher({
    "rules:rules": ({ rules }) =>
      pt.matchers.zero_or_more_matcher(rules).map(rule_matcher),
  })(tree)
}
