import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:clause_no_goals_no_name": ({ name, args }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:clause_no_goals": ({ name, clause_name, args }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        pt.str(clause_name),
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:clause_no_name": ({ name, args, goals }, { span }) =>
      new Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:clause": ({ name, clause_name, args, goals }, { span }) =>
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
    "stmt:private": ({ stmts }, { span }) =>
      new Stmts.Private(
        pt.matchers.zero_or_more_matcher(stmts).map(matchers.stmt_matcher),
        span,
      ),
    "stmt:rule": ({ name, rules }, { span }) =>
      new Stmts.Rule(pt.str(name), matchers.rules_matcher(rules), span),
    "stmt:hyperrule": ({ name, hyperrules }, { span }) =>
      new Stmts.Hyperrule(
        pt.str(name),
        matchers.hyperrules_matcher(hyperrules),
        span,
      ),
    "stmt:let": ({ name, exp }, { span }) =>
      new Stmts.Let(pt.str(name), matchers.exp_matcher(exp), span),
    "stmt:print": ({ exp }, { span }) =>
      new Stmts.Print(matchers.exp_matcher(exp), span),
    "stmt:compute": ({ exp }, { span }) =>
      new Stmts.Compute(matchers.exp_matcher(exp), span),
    "stmt:fn": ({ name, patterns, stmts, ret }, { span }) =>
      new Stmts.Fn(
        pt.str(name),
        matchers.args_matcher(patterns),
        matchers.stmts_matcher(stmts),
        matchers.exp_matcher(ret),
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
