import type { Exp } from "../exp"
import type { Relation } from "../relation"

export type Goal = Apply | Equal

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

export type Equal = {
  "@type": "Goal"
  "@kind": "Equal"
  left: Exp
  right: Exp
}

export function Equal(left: Exp, right: Exp): Equal {
  return {
    "@type": "Goal",
    "@kind": "Equal",
    left,
    right,
  }
}
