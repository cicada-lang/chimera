import pt from "@cicada-lang/partech"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:fact": ({ name, exp }, { span }) =>
      new Stmts.Fact(pt.str(name), matchers.exp_matcher(exp), span),
    "stmt:rule_nameless": ({ name, exp, goals }, { span }) =>
      new Stmts.Rule(
        pt.str(name),
        undefined,
        matchers.exp_matcher(exp),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:rule_named": ({ name, clause_name, exp, goals }, { span }) =>
      new Stmts.Rule(
        pt.str(name),
        pt.str(clause_name),
        matchers.exp_matcher(exp),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:query": ({ names, goals }, { span }) =>
      new Stmts.Query(matchers.names_matcher(names), matchers.goals_matcher(goals), span),
    "stmt:query_single": ({ name, goals }, { span }) =>
      new Stmts.QuerySingle(pt.str(name), matchers.goals_matcher(goals), span),
    "stmt:success": ({ goals }, { span }) =>
      new Stmts.Success([], matchers.goals_matcher(goals), span),
    "stmt:failure": ({ goals }, { span }) =>
      new Stmts.Failure([], matchers.goals_matcher(goals), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) => pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
