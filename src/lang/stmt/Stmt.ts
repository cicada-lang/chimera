import * as Errors from "../errors"
import type { Exp } from "../exp"
import { formatValue } from "../format"
import type { GoalExp } from "../goal-exp"
import type { RuleExp } from "../rule-exp"
import type { Span } from "../span"
import type { Value } from "../value"

export type Stmt =
  | Clause
  | Let
  | Fn
  | Rule
  | Import
  | ImportAll
  | ImportAllAs
  | Export
  | ExportNames
  | Compute
  | Print
  | Assert
  | Return
  | If

export type Clause = {
  "@type": "Stmt"
  "@kind": "Clause"
  relationName: string
  name: string | undefined
  exps: Array<Exp>
  goals: Array<GoalExp>
  span: Span
}

export function Clause(
  relationName: string,
  name: string | undefined,
  exps: Array<Exp>,
  goals: Array<GoalExp>,
  span: Span,
): Clause {
  return {
    "@type": "Stmt",
    "@kind": "Clause",
    relationName,
    name,
    exps,
    goals,
    span,
  }
}

export type Let = {
  "@type": "Stmt"
  "@kind": "Let"
  pattern: Exp
  exp: Exp
  span: Span
}

export function Let(pattern: Exp, exp: Exp, span: Span): Let {
  return {
    "@type": "Stmt",
    "@kind": "Let",
    pattern,
    exp,
    span,
  }
}

export type Fn = {
  "@type": "Stmt"
  "@kind": "Fn"
  name: string
  patterns: Array<Exp>
  stmts: Array<Stmt>
  span: Span
}

export function Fn(
  name: string,
  patterns: Array<Exp>,
  stmts: Array<Stmt>,
  span: Span,
): Fn {
  return {
    "@type": "Stmt",
    "@kind": "Fn",
    name,
    patterns,
    stmts,
    span,
  }
}

export type Rule = {
  "@type": "Stmt"
  "@kind": "Rule"
  name: string
  rules: Array<RuleExp>
  span: Span
}

export function Rule(name: string, rules: Array<RuleExp>, span: Span): Rule {
  return {
    "@type": "Stmt",
    "@kind": "Rule",
    name,
    rules,
    span,
  }
}

export type ImportBinding = {
  name: string
  alias?: string
}

export function ImportBinding(name: string, alias?: string): ImportBinding {
  return {
    name,
    alias,
  }
}

export type Import = {
  "@type": "Stmt"
  "@kind": "Import"
  bindings: Array<ImportBinding>
  path: string
  span: Span
}

export function Import(
  bindings: Array<ImportBinding>,
  path: string,
  span: Span,
): Import {
  return {
    "@type": "Stmt",
    "@kind": "Import",
    bindings,
    path,
    span,
  }
}

export type ImportAll = {
  "@type": "Stmt"
  "@kind": "ImportAll"
  path: string
  span: Span
}

export function ImportAll(path: string, span: Span): ImportAll {
  return {
    "@type": "Stmt",
    "@kind": "ImportAll",
    path,
    span,
  }
}

export type ImportAllAs = {
  "@type": "Stmt"
  "@kind": "ImportAllAs"
  name: string
  path: string
  span: Span
}

export function ImportAllAs(
  name: string,
  path: string,
  span: Span,
): ImportAllAs {
  return {
    "@type": "Stmt",
    "@kind": "ImportAllAs",
    name,
    path,
    span,
  }
}

export type Export = {
  "@type": "Stmt"
  "@kind": "Export"
  stmt: Stmt
  span: Span
}

export function Export(stmt: Stmt, span: Span): Export {
  return {
    "@type": "Stmt",
    "@kind": "Export",
    stmt,
    span,
  }
}

export type ExportNames = {
  "@type": "Stmt"
  "@kind": "ExportNames"
  names: Array<string>
  span: Span
}

export function ExportNames(names: Array<string>, span: Span): ExportNames {
  return {
    "@type": "Stmt",
    "@kind": "ExportNames",
    names,
    span,
  }
}

export type Compute = {
  "@type": "Stmt"
  "@kind": "Compute"
  exp: Exp
  span: Span
}

export function Compute(exp: Exp, span: Span): Compute {
  return {
    "@type": "Stmt",
    "@kind": "Compute",
    exp,
    span,
  }
}

export type Print = {
  "@type": "Stmt"
  "@kind": "Print"
  exp: Exp
  span: Span
}

export function Print(exp: Exp, span: Span): Print {
  return {
    "@type": "Stmt",
    "@kind": "Print",
    exp,
    span,
  }
}

export type Assert = {
  "@type": "Stmt"
  "@kind": "Assert"
  exp: Exp
  span: Span
}

export function Assert(exp: Exp, span: Span): Assert {
  return {
    "@type": "Stmt",
    "@kind": "Assert",
    exp,
    span,
  }
}

export class ReturnValue extends Errors.LangError {
  constructor(public value: Value) {
    super(
      [
        `[ReturnValue] can not use return at top-level`,
        `  return value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }
}

export type Return = {
  "@type": "Stmt"
  "@kind": "Return"
  exp: Exp
  span: Span
}

export function Return(exp: Exp, span: Span): Return {
  return {
    "@type": "Stmt",
    "@kind": "Return",
    exp,
    span,
  }
}

export type If = {
  "@type": "Stmt"
  "@kind": "If"
  target: Exp
  stmts: Array<Stmt>
  elseIfs: Array<{ target: Exp; stmts: Array<Stmt> }>
  elseStmts: Array<Stmt>
  span: Span
}

export function If(
  target: Exp,
  stmts: Array<Stmt>,
  elseIfs: Array<{ target: Exp; stmts: Array<Stmt> }>,
  elseStmts: Array<Stmt>,
  span: Span,
): If {
  return {
    "@type": "Stmt",
    "@kind": "If",
    target,
    stmts,
    elseIfs,
    elseStmts,
    span,
  }
}
