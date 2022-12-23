import type { Mod } from "../mod"
import { rewriteOneStep } from "../rewrite"
import type { RewriteRule } from "../rewrite-rule"
import type { Value } from "../value"

export function rewrite(mod: Mod, rule: RewriteRule, value: Value): Value {
  while (true) {
    const result = rewriteOneStep(mod, rule, value)
    if (result === undefined) {
      return value
    }

    value = result
  }
}
