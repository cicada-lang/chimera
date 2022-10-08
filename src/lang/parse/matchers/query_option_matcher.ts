// import pt from "@cicada-lang/partech"
// import * as Stmts from "../../stmts"

// export function query_option_matcher(tree: pt.Tree): Stmts.QueryOption {
//   return pt.matcher<Stmts.QueryOption>({
//     "query_option:limit": ({ value }, { span }) =>
//       Exps.Number(Number.parseFloat(pt.str(value)), span),
//   })(tree)
// }
