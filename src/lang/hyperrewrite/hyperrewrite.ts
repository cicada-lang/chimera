import type { Hyperrule } from "../hyperrule"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { hyperrewriteOneStep } from "./hyperrewriteOneStep"

export function hyperrewrite(
  mod: Mod,
  hyperrule: Hyperrule,
  values: Array<Value>,
): Array<Value> {
  while (true) {
    const result = hyperrewriteOneStep(mod, hyperrule, values)
    if (result === undefined) {
      return values
    }

    values = result
  }
}
