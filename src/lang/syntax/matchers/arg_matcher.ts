import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp/index.ts"
import * as matchers from "../matchers/index.ts"

export function arg_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "arg:plain": ({ exp }, { span }) => matchers.exp_matcher(exp),
  })(tree)
}
