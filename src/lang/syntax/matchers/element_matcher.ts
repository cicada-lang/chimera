import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp"
import * as matchers from "../matchers"

export function element_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "element:plain": ({ exp }, { span }) => matchers.exp_matcher(exp),
  })(tree)
}

export function elements_matcher(tree: pt.Tree): Array<Exp> {
  return pt.matcher({
    "elements:elements": ({ elements, last_element }) => [
      ...pt.matchers
        .zero_or_more_matcher(elements)
        .map(matchers.element_matcher),
      matchers.element_matcher(last_element),
    ],
    "elements:elements_empty": () => [],
  })(tree)
}
