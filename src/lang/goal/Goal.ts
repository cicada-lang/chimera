import type { Exp } from "../exp"
import { Relation } from "../relation"

export type Goal = Apply | Unifiable

export type Apply = {
  family: "Goal"
  kind: "Apply"
  name: string
  relation: Relation
  arg: Exp
}

export function Apply(name: string, relation: Relation, arg: Exp): Apply {
  return {
    family: "Goal",
    kind: "Apply",
    name,
    relation,
    arg,
  }
}

export type Unifiable = {
  family: "Goal"
  kind: "Unifiable"
  left: Exp
  right: Exp
}

export function Unifiable(left: Exp, right: Exp): Unifiable {
  return {
    family: "Goal",
    kind: "Unifiable",
    left,
    right,
  }
}
