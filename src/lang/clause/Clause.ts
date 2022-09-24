import { Exp } from "../exp"
import { Goal } from "../goal"

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
