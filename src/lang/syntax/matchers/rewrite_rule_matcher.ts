import * as pt from "@cicada-lang/partech"
import type { RewriteRuleExp } from "../../rewrite-rule-exp"
import * as RewriteRuleExps from "../../rewrite-rule-exp"
import * as matchers from "../matchers"

export function rewrite_rule_matcher(tree: pt.Tree): RewriteRuleExp {
  return pt.matcher<RewriteRuleExp>({
    "rewrite_rule:case": ({ from, to }, { span }) =>
      RewriteRuleExps.Case(
        matchers.exp_matcher(from),
        matchers.exp_matcher(to),
        span,
      ),
    "rewrite_rule:call": ({ exp }, { span }) =>
      RewriteRuleExps.Call(matchers.exp_matcher(exp), span),
  })(tree)
}

export function rewrite_rules_matcher(tree: pt.Tree): Array<RewriteRuleExp> {
  return pt.matcher({
    "rewrite_rules:rewrite_rules": ({ rewrite_rules }) =>
      pt.matchers.zero_or_more_matcher(rewrite_rules).map(rewrite_rule_matcher),
  })(tree)
}
