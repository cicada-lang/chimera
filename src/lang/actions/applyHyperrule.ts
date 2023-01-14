import * as Errors from "../errors"
import { hyperrewrite } from "../hyperrewrite"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function applyHyperrule(
  mod: Mod,
  target: Values.Hyperrule,
  args: Array<Value>,
): Value {
  if (args.length !== 1) {
    throw new Errors.LangError(
      [
        `[applyHyperrule] the number of arguments of Hyperrule must be 1`,
        `  args.length: ${args.length}`,
      ].join("\n"),
    )
  }

  return Values.fromArray(
    hyperrewrite(mod, target.hyperrule, Values.toArray(args[0])),
  )
}
