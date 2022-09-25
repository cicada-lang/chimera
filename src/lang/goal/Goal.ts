import { Value } from "../value"

export type Goal = Apply | Unifiable

export type Apply = {
  family: "Goal"
  kind: "Apply"
  name: string
  arg: Value
}

export function Apply(name: string, arg: Value): Apply {
  return {
    family: "Goal",
    kind: "Apply",
    name,
    arg,
  }
}

export type Unifiable = {
  family: "Goal"
  kind: "Unifiable"
  left: Value
  right: Value
}

export function Unifiable(left: Value, right: Value): Unifiable {
  return {
    family: "Goal",
    kind: "Unifiable",
    left,
    right,
  }
}
