import { Goal } from "../goal"
import { Value } from "../value"

export class Relation {
  constructor(public clauses: Array<Clause>) {}
}

/**

   ## Named clauses

   A clause has a name -- written after the line.

   With named clauses, we can write proofs by hand,
   just like writing inductive datatype in dependent type.

**/

export type Clause = {
  name: string
  value: Value
  goals: Array<Goal>
}

export function Clause(name: string, value: Value, goals: Array<Goal>): Clause {
  return {
    name,
    value,
    goals,
  }
}
