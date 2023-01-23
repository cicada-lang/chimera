import * as pt from "@cicada-lang/partech"
import * as matchers from "."
import type { HyperruleExp } from "../../hyperrule-exp"
import * as HyperruleExps from "../../hyperrule-exp"

export function hyperrule_matcher(tree: pt.Tree): HyperruleExp {
  return pt.matcher<HyperruleExp>({
    "hyperrule:simplify": ({ pattern, to }, { span }) =>
      HyperruleExps.Simplify(
        matchers.exp_matcher(pattern),
        matchers.exp_matcher(to),
        undefined,
        span,
      ),
    "hyperrule:simplify_guard": ({ pattern, to, guard }, { span }) =>
      HyperruleExps.Simplify(
        matchers.exp_matcher(pattern),
        matchers.exp_matcher(to),
        matchers.exp_matcher(guard),
        span,
      ),
    "hyperrule:propagate": ({ pattern, to }, { span }) =>
      HyperruleExps.Propagate(
        matchers.exp_matcher(pattern),
        matchers.exp_matcher(to),
        undefined,
        span,
      ),
    "hyperrule:propagate_guard": ({ pattern, to, guard }, { span }) =>
      HyperruleExps.Propagate(
        matchers.exp_matcher(pattern),
        matchers.exp_matcher(to),
        matchers.exp_matcher(guard),
        span,
      ),
    "hyperrule:use": ({ exp }, { span }) =>
      HyperruleExps.Use(matchers.exp_matcher(exp), span),
  })(tree)
}

export function hyperrules_matcher(tree: pt.Tree): Array<HyperruleExp> {
  return pt.matcher({
    "hyperrules:hyperrules": ({ hyperrules }) =>
      pt.matchers.zero_or_more_matcher(hyperrules).map(hyperrule_matcher),
  })(tree)
}
