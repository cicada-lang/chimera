import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"

export function trace_option_matcher(tree: pt.Tree): Stmts.TraceOption {
  return pt.matcher<Stmts.TraceOption>({
    "trace_option:steps": ({ exp }, { span }) =>
      Stmts.TraceOptionSteps(Number.parseFloat(pt.str(exp))),
  })(tree)
}
