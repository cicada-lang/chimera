import type { GoalExp } from "../goal-exp/index.ts"
import type { Span } from "../span/index.ts"
import type { Stmt } from "../stmt/index.ts"

export type Exp =
  | Var
  | String
  | Number
  | Boolean
  | Null
  | Term
  | ListCons
  | ListNull
  | Objekt
  | Dot
  | Ap
  | Fn
  | Eval
  | Find
  | If
  | Match

export type Var = {
  "@type": "Exp"
  "@kind": "Var"
  name: string
  span: Span
}

export function Var(name: string, span: Span): Var {
  return {
    "@type": "Exp",
    "@kind": "Var",
    name,
    span,
  }
}

export type String = {
  "@type": "Exp"
  "@kind": "String"
  data: string
  span: Span
}

export function String(data: string, span: Span): String {
  return {
    "@type": "Exp",
    "@kind": "String",
    data,
    span,
  }
}

export type Number = {
  "@type": "Exp"
  "@kind": "Number"
  data: number
  span: Span
}

export function Number(data: number, span: Span): Number {
  return {
    "@type": "Exp",
    "@kind": "Number",
    data,
    span,
  }
}

export type Boolean = {
  "@type": "Exp"
  "@kind": "Boolean"
  data: boolean
  span: Span
}

export function Boolean(data: boolean, span: Span): Boolean {
  return {
    "@type": "Exp",
    "@kind": "Boolean",
    data,
    span,
  }
}

export type Null = {
  "@type": "Exp"
  "@kind": "Null"
  span: Span
}

export function Null(span: Span): Null {
  return {
    "@type": "Exp",
    "@kind": "Null",
    span,
  }
}

export type Term = {
  "@type": "Exp"
  "@kind": "Term"
  type: string
  kind: string
  args: Array<Exp>
  span: Span
}

export function Term(
  type: string,
  kind: string,
  args: Array<Exp>,
  span: Span,
): Term {
  return {
    "@type": "Exp",
    "@kind": "Term",
    type,
    kind,
    args,
    span,
  }
}

export type ListCons = {
  "@type": "Exp"
  "@kind": "ListCons"
  car: Exp
  cdr: Exp
  span: Span
}

export function ListCons(car: Exp, cdr: Exp, span: Span): ListCons {
  return {
    "@type": "Exp",
    "@kind": "ListCons",
    car,
    cdr,
    span,
  }
}

export type ListNull = {
  "@type": "Exp"
  "@kind": "ListNull"
  span: Span
}

export function ListNull(span: Span): ListNull {
  return {
    "@type": "Exp",
    "@kind": "ListNull",
    span,
  }
}

export type Objekt = {
  "@type": "Exp"
  "@kind": "Objekt"
  properties: Record<string, Exp>
  span: Span
}

export function Objekt(properties: Record<string, Exp>, span: Span): Objekt {
  return {
    "@type": "Exp",
    "@kind": "Objekt",
    properties,
    span,
  }
}

export type Dot = {
  "@type": "Exp"
  "@kind": "Dot"
  target: Exp
  name: string
  span: Span
}

export function Dot(target: Exp, name: string, span: Span): Dot {
  return {
    "@type": "Exp",
    "@kind": "Dot",
    target,
    name,
    span,
  }
}

export type Ap = {
  "@type": "Exp"
  "@kind": "Ap"
  target: Exp
  args: Array<Exp>
  span: Span
}

export function Ap(target: Exp, args: Array<Exp>, span: Span): Ap {
  return {
    "@type": "Exp",
    "@kind": "Ap",
    target,
    args,
    span,
  }
}

export type Fn = {
  "@type": "Exp"
  "@kind": "Fn"
  patterns: Array<Exp>
  stmts: Array<Stmt>
  span: Span
}

export function Fn(patterns: Array<Exp>, stmts: Array<Stmt>, span: Span): Fn {
  return {
    "@type": "Exp",
    "@kind": "Fn",
    patterns,
    stmts,
    span,
  }
}

export type Eval = {
  "@type": "Exp"
  "@kind": "Eval"
  exp: Exp
  span: Span
}

export function Eval(exp: Exp, span: Span): Eval {
  return {
    "@type": "Exp",
    "@kind": "Eval",
    exp,
    span,
  }
}

export type Find = {
  "@type": "Exp"
  "@kind": "Find"
  pattern: Exp
  limit: number
  goals: Array<GoalExp>
  span: Span
}

export function Find(
  pattern: Exp,
  limit: number,
  goals: Array<GoalExp>,
  span: Span,
): Find {
  return {
    "@type": "Exp",
    "@kind": "Find",
    pattern,
    limit,
    goals,
    span,
  }
}

export type If = {
  "@type": "Exp"
  "@kind": "If"
  target: Exp
  thenExp: Exp
  elseExp: Exp
  span: Span
}

export function If(target: Exp, thenExp: Exp, elseExp: Exp, span: Span): If {
  return {
    "@type": "Exp",
    "@kind": "If",
    target,
    thenExp,
    elseExp,
    span,
  }
}

export type Caze = {
  pattern: Exp
  stmts: Array<Stmt>
  span: Span
}

export function Caze(pattern: Exp, stmts: Array<Stmt>, span: Span): Caze {
  return {
    pattern,
    stmts,
    span,
  }
}

export type Match = {
  "@type": "Exp"
  "@kind": "Match"
  target: Exp
  cazes: Array<Caze>
  span: Span
}

export function Match(target: Exp, cazes: Array<Caze>, span: Span): Match {
  return {
    "@type": "Exp",
    "@kind": "Match",
    target,
    cazes,
    span,
  }
}
