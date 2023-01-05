import { hyperrewriteOneStep } from "../hyperrewrite"
import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"

export function hyperrewrite(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
): Array<Value> {
  while (true) {
    const results = hyperrewriteOneStep(mod, hyperrule, values)
    if (results === undefined) {
      return values
    }

    values = results
  }
}
