import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp/index.ts"
import * as matchers from "./index.ts"

export function arg_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "arg:plain": ({ exp }, { span }) => matchers.exp_matcher(exp),
  })(tree)
}

export function args_matcher(tree: pt.Tree): Array<Exp> {
  return pt.matcher({
    "args:args": ({ args, last_arg }) => [
      ...pt.matchers.zero_or_more_matcher(args).map(matchers.arg_matcher),
      matchers.arg_matcher(last_arg),
    ],
    "args:args_empty": () => [],
  })(tree)
}
