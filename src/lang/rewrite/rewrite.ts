import type { Rule } from "../rule"
import type { Value } from "../value"
import { rewriteOneStep } from "./rewriteOneStep"

export function rewrite(rule: Rule, value: Value): Value {
  while (true) {
    const result = rewriteOneStep(rule, value)
    if (result === undefined) {
      return value
    }

    value = result
  }
}
