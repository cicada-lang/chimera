import { Clause } from "../clause"

export type Value = PatternVar | ValueAtom | ValueArray | ValueObject | Relation

export type ValueAtom = string | number | boolean | null

export type ValueArray = Array<Value>

export type ValueObject = { [x: string]: Value }

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
