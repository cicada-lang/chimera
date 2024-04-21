import type { Value } from "../value"

export type Goal = Apply | Equal | NotEqual | Conj | Disj

export type Apply = {
  "@type": "Goal"
  "@kind": "Apply"
  target: Value
  args: Array<Value>
}

export function Apply(target: Value, args: Array<Value>): Apply {
  return {
    "@type": "Goal",
    "@kind": "Apply",
    target,
    args,
  }
}

export type Equal = {
  "@type": "Goal"
  "@kind": "Equal"
  left: Value
  right: Value
}

export function Equal(left: Value, right: Value): Equal {
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
  left: Value
  right: Value
}

export function NotEqual(left: Value, right: Value): NotEqual {
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
