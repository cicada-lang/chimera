import type { Span } from "../span"

type ExpMeta = { span?: Span }

export type Exp =
  | PatternVar
  | ReifiedVar
  | String
  | Number
  | Boolean
  | Null
  | ArrayCons
  | ArrayNull
  | Objekt
  | Data

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
  count: number
} & ExpMeta

export function ReifiedVar(count: number, span?: Span): ReifiedVar {
  return {
    "@type": "Exp",
    "@kind": "ReifiedVar",
    count,
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

export type ArrayCons = {
  "@type": "Exp"
  "@kind": "ArrayCons"
  car: Exp
  cdr: Exp
} & ExpMeta

export function ArrayCons(car: Exp, cdr: Exp, span?: Span): ArrayCons {
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
} & ExpMeta

export function ArrayNull(span?: Span): ArrayNull {
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
} & ExpMeta

export function Objekt(properties: Record<string, Exp>, span?: Span): Objekt {
  return {
    "@type": "Exp",
    "@kind": "Objekt",
    properties,
    span,
  }
}

export type Data = {
  "@type": "Exp"
  "@kind": "Data"
  type: string
  kind: string
  args: Array<Exp>
} & ExpMeta

export function Data(
  type: string,
  kind: string,
  args: Array<Exp>,
  span?: Span,
): Data {
  return {
    "@type": "Exp",
    "@kind": "Data",
    type,
    kind,
    args,
    span,
  }
}
