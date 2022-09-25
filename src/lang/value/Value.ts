

export type Value =
  | Var
  | String
  | Number
  | Boolean
  | Null
  | Arrai
  | Objekt


export type Var = {
  family: "Value"
  kind: "Var"
  name: string
}

export function Var(name: string): Var {
  return {
    family: "Value",
    kind: "Var",
    name,
  }
}

export type String = {
  family: "Value"
  kind: "String"
  data: string
}

export function String(data: string): String {
  return {
    family: "Value",
    kind: "String",
    data,
  }
}

export type Number = {
  family: "Value"
  kind: "Number"
  data: number
}

export function Number(data: number): Number {
  return {
    family: "Value",
    kind: "Number",
    data,
  }
}

export type Boolean = {
  family: "Value"
  kind: "Boolean"
  data: boolean
}

export function Boolean(data: boolean): Boolean {
  return {
    family: "Value",
    kind: "Boolean",
    data,
  }
}

export type Null = {
  family: "Value"
  kind: "Null"
}

export function Null(): Null {
  return {
    family: "Value",
    kind: "Null",
  }
}

export type Arrai = {
  family: "Value"
  kind: "Arrai"
  elements: Array<Value>
}

export function Arrai(elements: Array<Value>): Arrai {
  return {
    family: "Value",
    kind: "Arrai",
    elements,
  }
}

export type Objekt = {
  family: "Value"
  kind: "Objekt"
  properties: Record<string, Value>
}

export function Objekt(properties: Record<string, Value>): Objekt {
  return {
    family: "Value",
    kind: "Objekt",
    properties,
  }
}
