import type { GoalExp } from "../goal-exp"
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
  | Term
  | Fn
  | Quote
  | Unquote
  | Find

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

export type Term = {
  "@type": "Exp"
  "@kind": "Term"
  name: string
  args: Array<Exp>
  span: Span
}

export function Term(name: string, args: Array<Exp>, span: Span): Term {
  return {
    "@type": "Exp",
    "@kind": "Term",
    name,
    args,
    span,
  }
}

export type Fn = {
  "@type": "Exp"
  "@kind": "Fn"
  patterns: Array<Exp>
  stmts: Array<Stmt>
  ret: Exp
  span: Span
}

export function Fn(
  patterns: Array<Exp>,
  stmts: Array<Stmt>,
  ret: Exp,
  span: Span,
): Fn {
  return {
    "@type": "Exp",
    "@kind": "Fn",
    patterns,
    stmts,
    ret,
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

export type Unquote = {
  "@type": "Exp"
  "@kind": "Unquote"
  exp: Exp
  span: Span
}

export function Unquote(exp: Exp, span: Span): Unquote {
  return {
    "@type": "Exp",
    "@kind": "Unquote",
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
