import type { Exp } from "../exp"

export type Goal = GoalApply | GoalUnifiable

export type GoalApply = {
  "@kind": "GoalApply"
  name: string
  arg: Exp
}

export function GoalApply(name: string, arg: Exp): GoalApply {
  return {
    "@kind": "GoalApply",
    name,
    arg,
  }
}

export type GoalUnifiable = {
  "@kind": "GoalUnifiable"
  left: Exp
  right: Exp
}

export function GoalUnifiable(left: Exp, right: Exp): GoalUnifiable {
  return {
    "@kind": "GoalUnifiable",
    left,
    right,
  }
}
