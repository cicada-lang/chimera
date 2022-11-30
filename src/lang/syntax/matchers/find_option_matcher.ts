import * as pt from "@cicada-lang/partech"
import type { FindOption } from "../../find/FindOption"
import * as FindOptions from "../../find/FindOption"

export function find_option_matcher(tree: pt.Tree): FindOption {
  return pt.matcher<FindOption>({
    "find_option:limit": ({ exp }, { span }) =>
      FindOptions.FindOptionLimit(Number.parseFloat(pt.str(exp))),
  })(tree)
}
