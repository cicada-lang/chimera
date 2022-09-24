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

export type Number = {
  family: "Value"
  kind: "Number"
  data: number
}

export type Boolean = {
  family: "Value"
  kind: "Boolean"
  data: boolean
}

export type Null = {
  family: "Value"
  kind: "Null"
}

export type Arrai = {
  family: "Value"
  kind: "Arrai"
  values: Array<Value>
}

export type Objekt = {
  family: "Value"
  kind: "Objekt"
  properties: Record<string, Value>
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
