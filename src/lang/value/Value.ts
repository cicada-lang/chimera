import type { Clause } from "../clause"

export type Value =
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
  | Relation
  | TypeConstraint

export type PatternVar = {
  "@type": "Value"
  "@kind": "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    "@type": "Value",
    "@kind": "PatternVar",
    name,
  }
}

export type ReifiedVar = {
  "@type": "Value"
  "@kind": "ReifiedVar"
  count: number
}

export function ReifiedVar(count: number): ReifiedVar {
  return {
    "@type": "Value",
    "@kind": "ReifiedVar",
    count,
  }
}

export type String = {
  "@type": "Value"
  "@kind": "String"
  data: string
}

export function String(data: string): String {
  return {
    "@type": "Value",
    "@kind": "String",
    data,
  }
}

export type Number = {
  "@type": "Value"
  "@kind": "Number"
  data: number
}

export function Number(data: number): Number {
  return {
    "@type": "Value",
    "@kind": "Number",
    data,
  }
}

export type Boolean = {
  "@type": "Value"
  "@kind": "Boolean"
  data: boolean
}

export function Boolean(data: boolean): Boolean {
  return {
    "@type": "Value",
    "@kind": "Boolean",
    data,
  }
}

export type Null = {
  "@type": "Value"
  "@kind": "Null"
}

export function Null(): Null {
  return {
    "@type": "Value",
    "@kind": "Null",
  }
}

export type ArrayCons = {
  "@type": "Value"
  "@kind": "ArrayCons"
  car: Value
  cdr: Value
}

export function ArrayCons(car: Value, cdr: Value): ArrayCons {
  return {
    "@type": "Value",
    "@kind": "ArrayCons",
    car,
    cdr,
  }
}

export type ArrayNull = {
  "@type": "Value"
  "@kind": "ArrayNull"
}

export function ArrayNull(): ArrayNull {
  return {
    "@type": "Value",
    "@kind": "ArrayNull",
  }
}

export type Objekt = {
  "@type": "Value"
  "@kind": "Objekt"
  properties: Record<string, Value>
  etc?: Value
}

export function Objekt(properties: Record<string, Value>, etc?: Value): Objekt {
  return {
    "@type": "Value",
    "@kind": "Objekt",
    properties,
    etc,
  }
}

export type Data = {
  "@type": "Value"
  "@kind": "Term"
  kind: string
  args: Array<Value>
}

export function Data(kind: string, args: Array<Value>): Data {
  return {
    "@type": "Value",
    "@kind": "Term",
    kind,
    args,
  }
}

export type Relation = {
  "@type": "Value"
  "@kind": "Relation"
  name: string
  clauses: Array<Clause>
}

export function Relation(name: string, clauses: Array<Clause>): Relation {
  return {
    "@type": "Value",
    "@kind": "Relation",
    name,
    clauses,
  }
}

export type TypeConstraint = {
  "@type": "Value"
  "@kind": "TypeConstraint"
  name: string
  predicate: (value: Value) => boolean
}

export function TypeConstraint(
  name: string,
  predicate: (value: Value) => boolean,
): TypeConstraint {
  return {
    "@type": "Value",
    "@kind": "TypeConstraint",
    name,
    predicate,
  }
}
