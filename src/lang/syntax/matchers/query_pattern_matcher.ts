import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function query_pattern_matcher(tree: pt.Tree): Stmts.QueryPattern {
  return pt.matcher<Stmts.QueryPattern>({
    "query_pattern:name": ({ name }) => Stmts.QueryPatternName(pt.str(name)),
    "query_pattern:names": ({ names }) =>
      Stmts.QueryPatternNames(matchers.names_matcher(names)),
  })(tree)
}
