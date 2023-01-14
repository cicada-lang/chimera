import * as Errors from "../errors"
import type { Mod } from "../mod"
import type { Value } from "../value"
import * as Values from "../value"

export function applyTypeConstraint(
  mod: Mod,
  target: Values.TypeConstraint,
  args: Array<Value>,
): Value {
  if (args.length !== 1) {
    throw new Errors.LangError(
      [
        `[applyTypeConstraint] the number of arguments of Rule must be 1`,
        `  args.length: ${args.length}`,
      ].join("\n"),
    )
  }

  return Values.Boolean(target.predicate(args[0]))
}
