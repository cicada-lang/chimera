export type Exp = PatternVar | String | Number | Boolean | Null | Arrai | Objekt

export type PatternVar = {
  family: "Exp"
  kind: "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    family: "Exp",
    kind: "PatternVar",
    name,
  }
}

export type String = {
  family: "Exp"
  kind: "String"
  data: string
}

export function String(data: string): String {
  return {
    family: "Exp",
    kind: "String",
    data,
  }
}

export type Number = {
  family: "Exp"
  kind: "Number"
  data: number
}

export function Number(data: number): Number {
  return {
    family: "Exp",
    kind: "Number",
    data,
  }
}

export type Boolean = {
  family: "Exp"
  kind: "Boolean"
  data: boolean
}

export function Boolean(data: boolean): Boolean {
  return {
    family: "Exp",
    kind: "Boolean",
    data,
  }
}

export type Null = {
  family: "Exp"
  kind: "Null"
}

export function Null(): Null {
  return {
    family: "Exp",
    kind: "Null",
  }
}

export type Arrai = {
  family: "Exp"
  kind: "Arrai"
  elements: Array<Exp>
}

export function Arrai(elements: Array<Exp>): Arrai {
  return {
    family: "Exp",
    kind: "Arrai",
    elements,
  }
}

export type Objekt = {
  family: "Exp"
  kind: "Objekt"
  properties: Record<string, Exp>
}

export function Objekt(properties: Record<string, Exp>): Objekt {
  return {
    family: "Exp",
    kind: "Objekt",
    properties,
  }
}
