import type { Exp } from "../exp"
import type { Span } from "../span"

export type GoalExp = Apply | Conj | Disj

export type Apply = {
  "@type": "GoalExp"
  "@kind": "Apply"
  name: string
  args: Array<Exp>
  span: Span
}

export function Apply(name: string, args: Array<Exp>, span: Span): Apply {
  return {
    "@type": "GoalExp",
    "@kind": "Apply",
    name,
    args,
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
