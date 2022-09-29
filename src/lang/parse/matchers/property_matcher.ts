import pt from "@cicada-lang/partech"
import * as Exps from "../../exp"
import * as matchers from "../matchers"

export function property_matcher(tree: pt.Tree): Exps.Property {
  return pt.matcher<Exps.Property>({
    "property:field_shorthand": ({ key }) =>
      Exps.PropertyPlain(matchers.key_matcher(key), Exps.PatternVar(matchers.key_matcher(key))),
    "property:field": ({ key, exp }) =>
      Exps.PropertyPlain(matchers.key_matcher(key), matchers.exp_matcher(exp)),
  })(tree)
}
