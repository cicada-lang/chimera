import type { GoalExp } from "../goal-exp"
import type { RuleExp } from "../rule-exp"
import type { Span } from "../span"
import type { Stmt } from "../stmt"

export type Exp =
  | Var
  | String
  | Number
  | Boolean
  | Null
  | ArrayCons
  | ArrayNull
  | Objekt
  | Dot
  | Ap
  | Fn
  | Quote
  | Eval
  | Find
  | RuleList
  | And
  | Or
  | Not
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

export type ArrayCons = {
  "@type": "Exp"
  "@kind": "ArrayCons"
  car: Exp
  cdr: Exp
  span: Span
}

export function ArrayCons(car: Exp, cdr: Exp, span: Span): ArrayCons {
  return {
    "@type": "Exp",
    "@kind": "ArrayCons",
    car,
    cdr,
    span,
  }
}

export type ArrayNull = {
  "@type": "Exp"
  "@kind": "ArrayNull"
  span: Span
}

export function ArrayNull(span: Span): ArrayNull {
  return {
    "@type": "Exp",
    "@kind": "ArrayNull",
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

export type Quote = {
  "@type": "Exp"
  "@kind": "Quote"
  exp: Exp
  span: Span
}

export function Quote(exp: Exp, span: Span): Quote {
  return {
    "@type": "Exp",
    "@kind": "Quote",
    exp,
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

export type RuleList = {
  "@type": "Exp"
  "@kind": "RuleList"
  name: string | undefined
  rules: Array<RuleExp>
  span: Span
}

export function RuleList(
  name: string | undefined,
  rules: Array<RuleExp>,
  span: Span,
): RuleList {
  return {
    "@type": "Exp",
    "@kind": "RuleList",
    name,
    rules,
    span,
  }
}

export type And = {
  "@type": "Exp"
  "@kind": "And"
  exps: Array<Exp>
  span: Span
}

export function And(exps: Array<Exp>, span: Span): And {
  return {
    "@type": "Exp",
    "@kind": "And",
    exps,
    span,
  }
}

export type Or = {
  "@type": "Exp"
  "@kind": "Or"
  exps: Array<Exp>
  span: Span
}

export function Or(exps: Array<Exp>, span: Span): Or {
  return {
    "@type": "Exp",
    "@kind": "Or",
    exps,
    span,
  }
}

export type Not = {
  "@type": "Exp"
  "@kind": "Not"
  exp: Exp
  span: Span
}

export function Not(exp: Exp, span: Span): Not {
  return {
    "@type": "Exp",
    "@kind": "Not",
    exp,
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
