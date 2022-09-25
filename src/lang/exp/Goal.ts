import { Exp } from "../exp"

export type Goal = GoalApply | GoalUnifiable

export type GoalApply = {
  kind: "GoalApply"
  name: string
  exp: Exp
}

export function GoalApply(name: string, exp: Exp): GoalApply {
  return {
    kind: "GoalApply",
    name,
    exp,
  }
}

export type GoalUnifiable = {
  kind: "GoalUnifiable"
  left: Exp
  right: Exp
}

export function GoalUnifiable(left: Exp, right: Exp): GoalUnifiable {
  return {
    kind: "GoalUnifiable",
    left,
    right,
  }
}
