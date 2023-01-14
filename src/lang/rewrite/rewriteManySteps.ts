import type { Mod } from "../mod"
import { rewriteOneStep } from "../rewrite"
import type { Rule } from "../rule"
import type { Value } from "../value"

export function rewriteManySteps(
  mod: Mod,
  rule: Rule,
  value: Value,
  options: { limit: number },
): Array<Value> {
  const results = []
  while (results.length < options.limit) {
    const result = rewriteOneStep(mod, rule, value)
    if (result === undefined) {
      return results
    }

    results.push(result)
    value = result
  }

  return results
}
