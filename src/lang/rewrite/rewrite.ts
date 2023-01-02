import type { Mod } from "../mod"
import { rewriteOneStep } from "../rewrite"
import type { Rule } from "../rule"
import type { Value } from "../value"

export function rewrite(mod: Mod, rule: Rule, value: Value): Value {
  while (true) {
    const result = rewriteOneStep(mod, rule, value)
    if (result === undefined) {
      return value
    }

    value = result
  }
}
