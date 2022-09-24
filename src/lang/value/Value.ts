import { Clause } from "../clause"

export type Value =
  | PatternVar
  | String
  | Number
  | Boolean
  | Null
  | Arrai
  | Objekt
  | Relation

export type PatternVar = {
  family: "Value"
  kind: "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    family: "Value",
    kind: "PatternVar",
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
  values: Array<Value>
}

export function Arrai(values: Array<Value>): Arrai {
  return {
    family: "Value",
    kind: "Arrai",
    values,
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

export type Relation = {
  family: "Value"
  kind: "Relation"
  clauses: Array<Clause>
}

export function Relation(clauses: Array<Clause>): Relation {
  return {
    family: "Value",
    kind: "Relation",
    clauses,
  }
}
