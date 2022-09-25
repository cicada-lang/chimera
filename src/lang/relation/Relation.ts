import { Clause } from "../relation"

export type Relation = {
  kind: "Relation"
  clauses: Array<Clause>
}

export function Relation(clauses: Array<Clause>): Relation {
  return {
    kind: "Relation",
    clauses,
  }
}
