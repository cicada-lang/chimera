import * as pt from "@cicada-lang/partech"
import type { RuleExp } from "../../rule-exp"
import * as RuleExps from "../../rule-exp"
import * as Stmts from "../../stmt"
import * as matchers from "./index"

export function rule_matcher(tree: pt.Tree): RuleExp {
  return pt.matcher<RuleExp>({
    "rule:case": ({ pattern, stmts }, { span }) =>
      RuleExps.Case(
        matchers.exp_matcher(pattern),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "rule:case_with_exp": ({ pattern, exp }, { span }) =>
      RuleExps.Case(
        matchers.exp_matcher(pattern),
        [Stmts.Return(matchers.exp_matcher(exp), span)],
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
