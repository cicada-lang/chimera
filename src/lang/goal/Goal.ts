import type { Exp } from "../exp"
import type { Relation } from "../relation"

export type Goal = Apply | Equal | NotEqual | Conj | Disj

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

export type NotEqual = {
  "@type": "Goal"
  "@kind": "NotEqual"
  left: Exp
  right: Exp
}

export function NotEqual(left: Exp, right: Exp): NotEqual {
  return {
    "@type": "Goal",
    "@kind": "NotEqual",
    left,
    right,
  }
}

export type Conj = {
  "@type": "Goal"
  "@kind": "Conj"
  goals: Array<Goal>
}

export function Conj(goals: Array<Goal>): Conj {
  return {
    "@type": "Goal",
    "@kind": "Conj",
    goals,
  }
}

export type Disj = {
  "@type": "Goal"
  "@kind": "Disj"
  goals: Array<Goal>
}

export function Disj(goals: Array<Goal>): Disj {
  return {
    "@type": "Goal",
    "@kind": "Disj",
    goals,
  }
}
