import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"

export function hyperrewriteManySteps(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
  options: { limit: number },
): Array<Array<Value>> {
  const results = [values]
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
