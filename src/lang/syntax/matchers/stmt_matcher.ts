import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:relation_no_goals_no_clause_name": ({ name, args }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:relation_no_goals": ({ name, clause_name, args }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        pt.str(clause_name),
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:relation_no_clause_name": ({ name, args, goals }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:relation": ({ name, clause_name, args, goals }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        pt.str(clause_name),
        matchers.args_matcher(args),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:find": ({ query_pattern, limit, goals }, { span }) => {
      const realLimit = pt.matchers.optional_matcher(limit)
      return new Stmts.Find(
        matchers.query_pattern_matcher(query_pattern),
        realLimit ? Number.parseFloat(pt.str(realLimit)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "stmt:trace": ({ steps, goals }, { span }) => {
      const realSteps = pt.matchers.optional_matcher(steps)
      return new Stmts.Trace(
        realSteps ? Number.parseFloat(pt.str(realSteps)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "stmt:assert_find": ({ query_pattern, limit, goals }, { span }) => {
      const realLimit = pt.matchers.optional_matcher(limit)
      return new Stmts.AssertFind(
        matchers.query_pattern_matcher(query_pattern),
        realLimit ? Number.parseFloat(pt.str(realLimit)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "stmt:assert_not_find": ({ query_pattern, limit, goals }, { span }) => {
      const realLimit = pt.matchers.optional_matcher(limit)
      return new Stmts.AssertNotFind(
        matchers.query_pattern_matcher(query_pattern),
        realLimit ? Number.parseFloat(pt.str(realLimit)) : Infinity,
        matchers.goals_matcher(goals),
        span,
      )
    },
    "stmt:import": ({ bindings, path }, { span }) =>
      new Stmts.Import(
        pt.matchers
          .zero_or_more_matcher(bindings)
          .map(matchers.import_binding_matcher),
        pt.trim_boundary(pt.str(path), 1),
        span,
      ),
    "stmt:import_all": ({ path }, { span }) =>
      new Stmts.ImportAll(pt.trim_boundary(pt.str(path), 1), span),
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
    "stmt:private": ({ stmts }, { span }) =>
      new Stmts.Private(
        pt.matchers.zero_or_more_matcher(stmts).map(matchers.stmt_matcher),
        span,
      ),
    "stmt:rewrite_rule": ({ name, rewrite_rules }, { span }) =>
      new Stmts.RewriteRule(
        pt.str(name),
        matchers.rewrite_rules_matcher(rewrite_rules),
        span,
      ),
    "stmt:let": ({ name, exp }, { span }) =>
      new Stmts.Let(pt.str(name), matchers.exp_matcher(exp), span),
    "stmt:compute": ({ exp }, { span }) =>
      new Stmts.Compute(matchers.exp_matcher(exp), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
