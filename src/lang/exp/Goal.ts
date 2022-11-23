import type { Exp } from "../exp"
import type { Span } from "../span"

export type Goal = GoalApply | GoalUnifiable

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

export type GoalUnifiable = {
  "@kind": "GoalUnifiable"
  left: Exp
  right: Exp
  span?: Span
}

export function GoalUnifiable(
  left: Exp,
  right: Exp,
  span?: Span,
): GoalUnifiable {
  return {
    "@kind": "GoalUnifiable",
    left,
    right,
    span,
  }
}
