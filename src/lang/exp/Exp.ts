import { Span } from "../span"

type ExpMeta = { span?: Span }

export type Exp = PatternVar | String | Number | Boolean | Null | Cons | Objekt | ObjektUnfolded

export type PatternVar = {
  family: "Exp"
  kind: "PatternVar"
  name: string
} & ExpMeta

export function PatternVar(name: string, span?: Span): PatternVar {
  return {
    family: "Exp",
    kind: "PatternVar",
    name,
    span,
  }
}

export type String = {
  family: "Exp"
  kind: "String"
  data: string
} & ExpMeta

export function String(data: string, span?: Span): String {
  return {
    family: "Exp",
    kind: "String",
    data,
    span,
  }
}

export type Number = {
  family: "Exp"
  kind: "Number"
  data: number
} & ExpMeta

export function Number(data: number, span?: Span): Number {
  return {
    family: "Exp",
    kind: "Number",
    data,
    span,
  }
}

export type Boolean = {
  family: "Exp"
  kind: "Boolean"
  data: boolean
} & ExpMeta

export function Boolean(data: boolean, span?: Span): Boolean {
  return {
    family: "Exp",
    kind: "Boolean",
    data,
    span,
  }
}

export type Null = {
  family: "Exp"
  kind: "Null"
} & ExpMeta

export function Null(span?: Span): Null {
  return {
    family: "Exp",
    kind: "Null",
    span,
  }
}

export type Cons = {
  family: "Exp"
  kind: "Cons"
  car: Exp
  cdr: Exp
} & ExpMeta

export function Cons(car: Exp, cdr: Exp, span?: Span): Cons {
  return {
    family: "Exp",
    kind: "Cons",
    car,
    cdr,
    span,
  }
}

export type Objekt = {
  family: "Exp"
  kind: "Objekt"
  properties: Record<string, Exp>
} & ExpMeta

export function Objekt(properties: Record<string, Exp>, span?: Span): Objekt {
  return {
    family: "Exp",
    kind: "Objekt",
    properties,
    span,
  }
}

export type ObjektUnfolded = {
  family: "Exp"
  kind: "ObjektUnfolded"
  properties: Array<Property>
} & ExpMeta

export function ObjektUnfolded(properties: Array<Property>, span?: Span): ObjektUnfolded {
  return {
    family: "Exp",
    kind: "ObjektUnfolded",
    properties,
    span,
  }
}

export type Property = PropertyPlain

export type PropertyPlain = {
  kind: "PropertyPlain"
  name: string
  exp: Exp
}

export function PropertyPlain(name: string, exp: Exp): PropertyPlain {
  return {
    kind: "PropertyPlain",
    name,
    exp,
  }
}
