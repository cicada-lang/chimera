import type { Exp } from "../exp"
import type { Span } from "../span"

export type GoalExp = Term | Equal | NotEqual | Conj | Disj

export type Term = {
  "@type": "GoalExp"
  "@kind": "Term"
  name: string
  args: Array<Exp>
  span: Span
}

export function Term(name: string, args: Array<Exp>, span: Span): Term {
  return {
    "@type": "GoalExp",
    "@kind": "Term",
    name,
    args,
    span,
  }
}

export type Equal = {
  "@type": "Goal"
  "@kind": "Equal"
  left: Exp
  right: Exp
  span: Span
}

export function Equal(left: Exp, right: Exp, span: Span): Equal {
  return {
    "@type": "Goal",
    "@kind": "Equal",
    left,
    right,
    span,
  }
}

export type NotEqual = {
  "@type": "Goal"
  "@kind": "NotEqual"
  left: Exp
  right: Exp
  span: Span
}

export function NotEqual(left: Exp, right: Exp, span: Span): NotEqual {
  return {
    "@type": "Goal",
    "@kind": "NotEqual",
    left,
    right,
    span,
  }
}

export type Conj = {
  "@type": "GoalExp"
  "@kind": "Conj"
  goals: Array<GoalExp>
  span: Span
}

export function Conj(goals: Array<GoalExp>, span: Span): Conj {
  return {
    "@type": "GoalExp",
    "@kind": "Conj",
    goals,
    span,
  }
}

export type Disj = {
  "@type": "GoalExp"
  "@kind": "Disj"
  goals: Array<GoalExp>
  span: Span
}

export function Disj(goals: Array<GoalExp>, span: Span): Disj {
  return {
    "@type": "GoalExp",
    "@kind": "Disj",
    goals,
    span,
  }
}
