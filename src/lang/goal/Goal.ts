import type { Exp } from "../exp"
import type { Relation } from "../relation"

export type Goal = Apply | Unifiable

export type Apply = {
  "@type": "Goal"
  "@kind": "Apply"
  name: string
  relation: Relation
  arg: Exp
}

export function Apply(name: string, relation: Relation, arg: Exp): Apply {
  return {
    "@type": "Goal",
    "@kind": "Apply",
    name,
    relation,
    arg,
  }
}

export type Unifiable = {
  "@type": "Goal"
  "@kind": "Unifiable"
  left: Exp
  right: Exp
}

export function Unifiable(left: Exp, right: Exp): Unifiable {
  return {
    "@type": "Goal",
    "@kind": "Unifiable",
    left,
    right,
  }
}
