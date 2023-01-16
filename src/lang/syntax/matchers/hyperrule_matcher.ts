import * as pt from "@cicada-lang/partech"
import * as matchers from "."
import type { HyperruleExp } from "../../hyperrule-exp"
import * as HyperruleExps from "../../hyperrule-exp"

export function hyperrule_matcher(tree: pt.Tree): HyperruleExp {
  return pt.matcher<HyperruleExp>({
    "hyperrule:case": ({ from, to }, { span }) =>
      HyperruleExps.Simplify(
        matchers.elements_matcher(from),
        matchers.elements_matcher(to),
        undefined,
        span,
      ),
    "hyperrule:case_guard": ({ from, to, guard }, { span }) =>
      HyperruleExps.Simplify(
        matchers.elements_matcher(from),
        matchers.elements_matcher(to),
        matchers.exp_matcher(guard),
        span,
      ),
  })(tree)
}

export function hyperrules_matcher(tree: pt.Tree): Array<HyperruleExp> {
  return pt.matcher({
    "hyperrules:hyperrules": ({ hyperrules }) =>
      pt.matchers.zero_or_more_matcher(hyperrules).map(hyperrule_matcher),
  })(tree)
}
