import { Value, Var } from "../value"

export function isVar(value: Value): value is Var {
  return value.kind === "Var"
}
