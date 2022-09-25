import { Value } from "../value"

export type Goal = Apply | Unifiable

export type Apply = {
  family: "Goal"
  kind: "Apply"
  name: string
  value: Value
}

export function Apply(name: string, value: Value): Apply {
  return {
    family: "Goal",
    kind: "Apply",
    name,
    value,
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
