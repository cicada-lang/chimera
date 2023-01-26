import * as pt from "@cicada-lang/partech"
import * as matchers from "."
import type { HyperruleExp } from "../../hyperrule-exp"
import * as HyperruleExps from "../../hyperrule-exp"
import * as Stmts from "../../stmt"

export function hyperrule_matcher(tree: pt.Tree): HyperruleExp {
  return pt.matcher<HyperruleExp>({
    "hyperrule:simplify": ({ pattern, stmts }, { span }) =>
      HyperruleExps.Simplify(
        matchers.exp_matcher(pattern),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "hyperrule:simplify_with_exp": ({ pattern, exp }, { span }) =>
      HyperruleExps.Simplify(
        matchers.exp_matcher(pattern),
        [Stmts.Return(matchers.exp_matcher(exp), span)],
        span,
      ),
    "hyperrule:propagate": ({ pattern, stmts }, { span }) =>
      HyperruleExps.Propagate(
        matchers.exp_matcher(pattern),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "hyperrule:propagate_with_exp": ({ pattern, exp }, { span }) =>
      HyperruleExps.Propagate(
        matchers.exp_matcher(pattern),
        [Stmts.Return(matchers.exp_matcher(exp), span)],
        span,
      ),
    "hyperrule:include": ({ exp }, { span }) =>
      HyperruleExps.Include(matchers.exp_matcher(exp), span),
  })(tree)
}

export function hyperrules_matcher(tree: pt.Tree): Array<HyperruleExp> {
  return pt.matcher({
    "hyperrules:hyperrules": ({ hyperrules }) =>
      pt.matchers.zero_or_more_matcher(hyperrules).map(hyperrule_matcher),
  })(tree)
}
