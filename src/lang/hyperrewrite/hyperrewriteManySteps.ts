import { hyperrewriteOneStep } from "../hyperrewrite"
import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"

export function hyperrewriteManySteps(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
  options: { limit: number },
): Array<Array<Value>> {
  const results = []
  while (results.length < options.limit) {
    const result = hyperrewriteOneStep(mod, hyperrule, values)
    if (result === undefined) {
      return results
    }

    results.push(result)
    values = result
  }

  return results
}
