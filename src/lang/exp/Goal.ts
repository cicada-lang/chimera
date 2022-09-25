import { Exp } from "../exp"

export type Goal = Apply | Unifiable

export type Apply = {
  family: "Goal"
  kind: "Apply"
  name: string
  exp: Exp
}

export function Apply(name: string, exp: Exp): Apply {
  return {
    family: "Goal",
    kind: "Apply",
    name,
    exp,
  }
}

export type Unifiable = {
  family: "Goal"
  kind: "Unifiable"
  left: Exp
  right: Exp
}

export function Unifiable(left: Exp, right: Exp): Unifiable {
  return {
    family: "Goal",
    kind: "Unifiable",
    left,
    right,
  }
}
