import type { Exp } from "../exp"
import type { Span } from "../span"

export type Goal = GoalApply | GoalEqual

export type GoalApply = {
  "@kind": "GoalApply"
  name: string
  arg: Exp
  span?: Span
}

export function GoalApply(name: string, arg: Exp, span?: Span): GoalApply {
  return {
    "@kind": "GoalApply",
    name,
    arg,
    span,
  }
}

export type GoalEqual = {
  "@kind": "GoalEqual"
  left: Exp
  right: Exp
  span?: Span
}

export function GoalEqual(left: Exp, right: Exp, span?: Span): GoalEqual {
  return {
    "@kind": "GoalEqual",
    left,
    right,
    span,
  }
}
