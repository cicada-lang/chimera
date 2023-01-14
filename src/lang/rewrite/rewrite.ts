import type { Mod } from "../mod"
import type { Rule } from "../rule"
import type { Value } from "../value"
import { rewriteOneStep } from "./rewriteOneStep"

export function rewrite(mod: Mod, rule: Rule, value: Value): Value {
  while (true) {
    const result = rewriteOneStep(mod, rule, value)
    if (result === undefined) {
      return value
    }

    value = result
  }
}
