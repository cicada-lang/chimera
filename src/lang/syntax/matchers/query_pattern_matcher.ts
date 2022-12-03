import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function query_pattern_matcher(tree: pt.Tree): Stmts.QueryPattern {
  return pt.matcher<Stmts.QueryPattern>({
    "query_pattern:name": ({ name }, { span }) =>
      Stmts.QueryPatternName(pt.str(name), span),
    "query_pattern:names": ({ names }, { span }) =>
      Stmts.QueryPatternNames(matchers.names_matcher(names), span),
  })(tree)
}
