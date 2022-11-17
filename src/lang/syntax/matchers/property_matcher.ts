import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp"
import * as Exps from "../../exp"
import * as matchers from "../matchers"

export function property_matcher(tree: pt.Tree): [string, Exp] {
  return pt.matcher<[string, Exp]>({
    "property:field_shorthand": ({ key }) => [
      matchers.key_matcher(key),
      Exps.PatternVar(matchers.key_matcher(key)),
    ],
    "property:field": ({ key, exp }) => [
      matchers.key_matcher(key),
      matchers.exp_matcher(exp),
    ],
  })(tree)
}
