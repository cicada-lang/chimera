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
    "stmt:find": ({ query_pattern, options, goals }, { span }) =>
      new Stmts.Find(
        matchers.query_pattern_matcher(query_pattern),
        pt.matchers
          .zero_or_more_matcher(options)
          .map(matchers.find_option_matcher),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:trace": ({ steps, goals }, { span }) => {
      const realSteps = pt.matchers.optional_matcher(steps)
      return new Stmts.Trace(
        realSteps ? Number.parseFloat(pt.str(realSteps)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "stmt:assert_find": ({ query_pattern, options, goals }, { span }) =>
      new Stmts.AssertFind(
        matchers.query_pattern_matcher(query_pattern),
        pt.matchers
          .zero_or_more_matcher(options)
          .map(matchers.find_option_matcher),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:assert_not_find": ({ query_pattern, options, goals }, { span }) =>
      new Stmts.AssertNotFind(
        matchers.query_pattern_matcher(query_pattern),
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
    "stmt:test": ({ description, stmts }, { span }) =>
      new Stmts.Test(
        pt.trim_boundary(pt.str(description), 1),
        pt.matchers.zero_or_more_matcher(stmts).map(matchers.stmt_matcher),
        span,
      ),
    "stmt:test_no_description": ({ stmts }, { span }) =>
      new Stmts.Test(
        undefined,
        pt.matchers.zero_or_more_matcher(stmts).map(matchers.stmt_matcher),
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
