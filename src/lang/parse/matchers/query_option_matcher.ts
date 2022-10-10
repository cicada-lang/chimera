import pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"

export function query_option_matcher(tree: pt.Tree): Stmts.QueryOption {
  return pt.matcher<Stmts.QueryOption>({
    "query_option:limit": ({ value }, { span }) =>
      Stmts.QueryOptionLimit(Number.parseFloat(pt.str(value))),
    "query_option:debug": ({ value }, { span }) =>
      Stmts.QueryOptionDebug(Math.floor(Number.parseFloat(pt.str(value)))),
    "query_option:debug_default": ({}, { span }) => Stmts.QueryOptionDebug(0),
  })(tree)
}
