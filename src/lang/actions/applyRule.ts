import * as Errors from "../errors"
import type { Mod } from "../mod"
import { rewrite } from "../rewrite"
import type * as Values from "../value"
import type { Value } from "../value"

export function applyRule(
  mod: Mod,
  target: Values.Rule,
  args: Array<Value>,
): Value {
  if (args.length !== 1) {
    throw new Errors.LangError(
      [
        `[doAp] the number of arguments of Rule must be 1`,
        `  args.length: ${args.length}`,
      ].join("\n"),
    )
  }

  return rewrite(mod, target.rule, args[0])
}
