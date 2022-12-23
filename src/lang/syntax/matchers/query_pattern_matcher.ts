import * as pt from "@cicada-lang/partech"
import type { QueryPattern } from "../../stmts/utils/QueryPattern"
import * as QueryPatterns from "../../stmts/utils/QueryPattern"
import * as matchers from "../matchers"

export function query_pattern_matcher(tree: pt.Tree): QueryPattern {
  return pt.matcher<QueryPattern>({
    "query_pattern:name": ({ name }, { span }) =>
      QueryPatterns.QueryPatternName(pt.str(name), span),
    "query_pattern:pattern_variable_names": (
      { pattern_variable_names },
      { span },
    ) =>
      QueryPatterns.QueryPatternNames(
        matchers.pattern_variable_names_matcher(pattern_variable_names),
        span,
      ),
  })(tree)
}
