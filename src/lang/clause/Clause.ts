import { Json } from "../../utils/Json"
import { Goal } from "../goal"

export type Clause = Fact | Rule

export type Fact = {
  kind: "Fact"
  data: Json
}

export function Fact(data: Json): Fact {
  return {
    kind: "Fact",
    data,
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
  data: Json
  premises: Array<Goal>
}

export function Rule(name: string, data: Json, premises: Array<Goal>): Rule {
  return {
    kind: "Rule",
    name    ,
    data,
    premises,
  }
}
