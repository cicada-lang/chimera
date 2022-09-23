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

export type Rule = {
  kind: "Rule"
  data: Json
  premises: Array<Goal>
}

export function Rule(data: Json, premises: Array<Goal>): Rule {
  return {
    kind: "Rule",
    data,
    premises,
  }
}
