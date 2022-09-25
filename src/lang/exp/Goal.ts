import { Exp } from "../exp"

export type Goal = Apply | Unifiable

export type Apply = {
  kind: "Apply"
  name: string
  exp: Exp
}

export function Apply(name: string, exp: Exp): Apply {
  return {
    kind: "Apply",
    name,
    exp,
  }
}

export type Unifiable = {
  kind: "Unifiable"
  left: Exp
  right: Exp
}

export function Unifiable(left: Exp, right: Exp): Unifiable {
  return {
    kind: "Unifiable",
    left,
    right,
  }
}
