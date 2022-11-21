import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp"
import * as matchers from "../matchers"

export function arg_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "arg:plain": ({ exp }, { span }) => matchers.exp_matcher(exp),
  })(tree)
}
