import type { Exp } from "../exp"
import type { Span } from "../span"

export type GoalExp = Apply | Equal | NotEqual

export type Apply = {
  "@type": "GoalExp"
  "@kind": "Apply"
  name: string
  arg: Exp
  span?: Span
}

export function Apply(name: string, arg: Exp, span?: Span): Apply {
  return {
    "@type": "GoalExp",
    "@kind": "Apply",
    name,
    arg,
    span,
  }
}

export type Equal = {
  "@type": "GoalExp"
  "@kind": "Equal"
  left: Exp
  right: Exp
  span?: Span
}

export function Equal(left: Exp, right: Exp, span?: Span): Equal {
  return {
    "@type": "GoalExp",
    "@kind": "Equal",
    left,
    right,
    span,
  }
}

export type NotEqual = {
  "@type": "GoalExp"
  "@kind": "NotEqual"
  left: Exp
  right: Exp
  span?: Span
}

export function NotEqual(left: Exp, right: Exp, span?: Span): NotEqual {
  return {
    "@type": "GoalExp",
    "@kind": "NotEqual",
    left,
    right,
    span,
  }
}
