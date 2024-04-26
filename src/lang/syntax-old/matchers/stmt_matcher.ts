import * as pt from "@cicada-lang/partech"
import * as Exps from "../../exp/index.js"
import type { Stmt } from "../../stmt/index.js"
import * as Stmts from "../../stmt/index.js"
import * as matchers from "./index.js"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:clause_no_goals_no_name": ({ name, args }, { span }) =>
      Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:clause_no_goals": ({ name, clause_name, args }, { span }) =>
      Stmts.Clause(
        pt.str(name),
        pt.str(clause_name),
        matchers.args_matcher(args),
        [],
        span,
      ),
    "stmt:clause_no_name": ({ name, args, goals }, { span }) =>
      Stmts.Clause(
        pt.str(name),
        undefined,
        matchers.args_matcher(args),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:clause": ({ name, clause_name, args, goals }, { span }) =>
      Stmts.Clause(
        pt.str(name),
        pt.str(clause_name),
        matchers.args_matcher(args),
        matchers.goals_matcher(goals),
        span,
      ),
    "stmt:import": ({ bindings, path }, { span }) =>
      Stmts.Import(
        pt.matchers
          .zero_or_more_matcher(bindings)
          .map(matchers.import_binding_matcher),
        pt.trim_boundary(pt.str(path), 1),
        span,
      ),
    "stmt:import_all": ({ path }, { span }) =>
      Stmts.ImportAll(pt.trim_boundary(pt.str(path), 1), span),
    "stmt:import_all_as": ({ name, path }, { span }) =>
      Stmts.ImportAllAs(pt.str(name), pt.trim_boundary(pt.str(path), 1), span),
    "stmt:export": ({ stmt }, { span }) =>
      Stmts.Export(matchers.stmt_matcher(stmt), span),
    "stmt:export_names": ({ names }, { span }) =>
      Stmts.ExportNames(matchers.variable_names_matcher(names), span),
    "stmt:let": ({ pattern, exp }, { span }) =>
      Stmts.Let(matchers.exp_matcher(pattern), matchers.exp_matcher(exp), span),
    "stmt:print": ({ exp }, { span }) =>
      Stmts.Print(matchers.exp_matcher(exp), span),
    "stmt:compute": ({ exp }, { span }) =>
      Stmts.Compute(matchers.exp_matcher(exp), span),
    "stmt:fn": ({ name, patterns, stmts }, { span }) =>
      Stmts.Fn(
        pt.str(name),
        matchers.args_matcher(patterns),
        matchers.stmts_matcher(stmts),
        span,
      ),
    "stmt:return": ({ exp }, { span }) =>
      Stmts.Return(matchers.exp_matcher(exp), span),
    "stmt:return_null": ({}, { span }) => Stmts.Return(Exps.Null(span), span),
    "stmt:assert": ({ exp }, { span }) =>
      Stmts.Assert(matchers.exp_matcher(exp), span),
    "stmt:if": ({ target, stmts, else_ifs }, { span }) =>
      Stmts.If(
        matchers.exp_matcher(target),
        matchers.stmts_matcher(stmts),
        matchers.else_ifs_matcher(else_ifs),
        [],
        span,
      ),
    "stmt:if_else": ({ target, stmts, else_ifs, else_stmts }, { span }) =>
      Stmts.If(
        matchers.exp_matcher(target),
        matchers.stmts_matcher(stmts),
        matchers.else_ifs_matcher(else_ifs),
        matchers.stmts_matcher(else_stmts),
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
