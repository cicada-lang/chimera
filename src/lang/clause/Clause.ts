import { Exp } from "../exp"
import { Goal } from "../goal"

export type Clause = Fact | Rule

export type Fact = {
  kind: "Fact"
  exp: Exp
}

export function Fact(exp: Exp): Fact {
  return {
    kind: "Fact",
    exp,
  }
}

/**

   ## Named rules

   A rule has a name -- written after the rule line.

   With named rules, we can write proofs by hand,
   just like writing inductive datatype in dependent type.

**/

export type Rule = {
  kind: "Rule"
  name: string
  exp: Exp
  premises: Array<Goal>
}

export function Rule(name: string, exp: Exp, premises: Array<Goal>): Rule {
  return {
    kind: "Rule",
    name,
    exp,
    premises,
  }
}
