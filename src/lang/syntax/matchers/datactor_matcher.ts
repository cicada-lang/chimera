import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function datactor_matcher(tree: pt.Tree): Stmts.DatactorExp {
  return pt.matcher<Stmts.DatactorExp>({
    "datactor:datactor_no_goals_no_args": ({ name }, { span }) =>
      Stmts.DatactorExp(pt.str(name), [], []),
    "datactor:datactor_no_goals": ({ name, args }, { span }) =>
      Stmts.DatactorExp(pt.str(name), matchers.names_matcher(args), []),
    "datactor:datactor": ({ name, args, goals }, { span }) =>
      Stmts.DatactorExp(
        pt.str(name),
        matchers.names_matcher(args),
        matchers.goals_matcher(goals),
      ),
  })(tree)
}

export function datactors_matcher(tree: pt.Tree): Array<Stmts.DatactorExp> {
  return pt.matcher({
    "datactors:datactors": ({ datactors }) =>
      pt.matchers.zero_or_more_matcher(datactors).map(datactor_matcher),
  })(tree)
}
