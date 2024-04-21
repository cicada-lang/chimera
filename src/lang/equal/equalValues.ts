import type { Value } from "../value/index.js"
import { equal } from "./equal.js"

export function equalValues(
  leftValues: Array<Value>,
  rightValues: Array<Value>,
): boolean {
  if (leftValues.length !== rightValues.length) {
    return false
  }

  for (const [index, left] of leftValues.entries()) {
    const right = rightValues[index]
    if (!equal(left, right)) {
      return false
    }
  }

  return true
}
