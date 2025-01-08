import * as pt from "@cicada-lang/partech"
import type { Exp } from "../../exp/index.ts"
import type { Stmt } from "../../stmt/index.ts"
import * as matchers from "./index.ts"

export function else_if_matcher(tree: pt.Tree): {
  target: Exp
  stmts: Array<Stmt>
} {
  return pt.matcher({
    "else_if:else_if": ({ target, stmts }, { span }) => ({
      target: matchers.exp_matcher(target),
      stmts: matchers.stmts_matcher(stmts),
    }),
  })(tree)
}

export function else_ifs_matcher(
  tree: pt.Tree,
): Array<{ target: Exp; stmts: Array<Stmt> }> {
  return pt.matcher({
    "else_ifs:else_ifs": ({ else_ifs }) =>
      pt.matchers.zero_or_more_matcher(else_ifs).map(else_if_matcher),
  })(tree)
}
