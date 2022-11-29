import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:fact": ({ name, exp }, { span }) =>
      new Stmts.RelationFact(pt.str(name), matchers.exp_matcher(exp), span),
    "stmt:clause_nameless": ({ name, exp, goals }, { span }) =>
      new Stmts.RelationClause(
        pt.str(name),
        undefined,
        matchers.exp_matcher(exp),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:clause_named": ({ name, clause_name, exp, goals }, { span }) =>
      new Stmts.RelationClause(
        pt.str(name),
        pt.str(clause_name),
        matchers.exp_matcher(exp),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:find": ({ names, options, goals }, { span }) =>
      new Stmts.Find(
        Stmts.QueryPatternNames(matchers.names_matcher(names)),
        pt.matchers
          .zero_or_more_matcher(options)
          .map(matchers.find_option_matcher),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:find_single": ({ name, options, goals }, { span }) =>
      new Stmts.Find(
        Stmts.QueryPatternName(pt.str(name)),
        pt.matchers
          .zero_or_more_matcher(options)
          .map(matchers.find_option_matcher),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:import": ({ bindings, path }, { span }) =>
      new Stmts.Import(
        pt.matchers
          .zero_or_more_matcher(bindings)
          .map(matchers.import_binding_matcher),
        pt.trim_boundary(pt.str(path), 1),
        span,
      ),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
