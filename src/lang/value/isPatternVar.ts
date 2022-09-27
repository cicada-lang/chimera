import { Value, PatternVar } from "../value"

export function isPatternVar(value: Value): value is PatternVar {
  return value.kind === "PatternVar"
}
