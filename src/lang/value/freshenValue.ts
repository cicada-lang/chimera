import { Value } from "../value"

export function freshenValue(
  usedNames: Set<string> | Array<string>,
  value: Value,
): Value {
  return value
}
