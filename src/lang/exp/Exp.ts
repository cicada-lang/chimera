import type { Span } from "../span"

type ExpMeta = { span?: Span }

export type Exp =
  | PatternVar
  | ReifiedVar
  | String
  | Number
  | Boolean
  | Null
  | ListCons
  | ListNull
  | Objekt

export type PatternVar = {
  "@type": "Exp"
  "@kind": "PatternVar"
  name: string
} & ExpMeta

export function PatternVar(name: string, span?: Span): PatternVar {
  return {
    "@type": "Exp",
    "@kind": "PatternVar",
    name,
    span,
  }
}

export type ReifiedVar = {
  "@type": "Exp"
  "@kind": "ReifiedVar"
  name: string
} & ExpMeta

export function ReifiedVar(name: string, span?: Span): ReifiedVar {
  return {
    "@type": "Exp",
    "@kind": "ReifiedVar",
    name,
    span,
  }
}

export type String = {
  "@type": "Exp"
  "@kind": "String"
  data: string
} & ExpMeta

export function String(data: string, span?: Span): String {
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
} & ExpMeta

export function Number(data: number, span?: Span): Number {
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
} & ExpMeta

export function Boolean(data: boolean, span?: Span): Boolean {
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
} & ExpMeta

export function Null(span?: Span): Null {
  return {
    "@type": "Exp",
    "@kind": "Null",
    span,
  }
}

export type ListCons = {
  "@type": "Exp"
  "@kind": "ListCons"
  car: Exp
  cdr: Exp
} & ExpMeta

export function ListCons(car: Exp, cdr: Exp, span?: Span): ListCons {
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
} & ExpMeta

export function ListNull(span?: Span): ListNull {
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
} & ExpMeta

export function Objekt(properties: Record<string, Exp>, span?: Span): Objekt {
  return {
    "@type": "Exp",
    "@kind": "Objekt",
    properties,
    span,
  }
}
