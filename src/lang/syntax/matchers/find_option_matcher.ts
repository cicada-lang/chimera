import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"

export function find_option_matcher(tree: pt.Tree): Stmts.FindOption {
  return pt.matcher<Stmts.FindOption>({
    "find_option:limit": ({ exp }, { span }) =>
      Stmts.FindOptionLimit(Number.parseFloat(pt.str(exp))),
    "find_option:debug": ({ exp }, { span }) =>
      Stmts.FindOptionDebug(Math.floor(Number.parseFloat(pt.str(exp)))),
    "find_option:debug_default": ({}, { span }) => Stmts.FindOptionDebug(0),
  })(tree)
}