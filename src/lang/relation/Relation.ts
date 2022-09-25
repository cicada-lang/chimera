
import { Exp } from "../exp"
import { Goal } from "../goal"

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

/**

   ## Named clauses

   A clause has a name -- written after the line.

   With named clauses, we can write proofs by hand,
   just like writing inductive datatype in dependent type.

**/

export type Clause = {
  name: string
  exp: Exp
  goals: Array<Goal>
}

export function Clause(name: string, exp: Exp, goals: Array<Goal>): Clause {
  return {
    name,
    exp,
    goals,
  }
}
