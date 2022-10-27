import pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"

export function query_option_matcher(tree: pt.Tree): Stmts.FindOption {
  return pt.matcher<Stmts.FindOption>({
    "query_option:limit": ({ value }, { span }) =>
      Stmts.FindOptionLimit(Number.parseFloat(pt.str(value))),
    "query_option:debug": ({ value }, { span }) =>
      Stmts.FindOptionDebug(Math.floor(Number.parseFloat(pt.str(value)))),
    "query_option:debug_default": ({}, { span }) => Stmts.FindOptionDebug(0),
  })(tree)
}
