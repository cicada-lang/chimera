import type { Env } from "../env"
import * as Errors from "../errors"
import { lookup } from "../evaluate"
import { formatValue } from "../format"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import type { Value } from "../value"

export function goalFromValue(mod: Mod, env: Env, value: Value) {
  if (value["@kind"] !== "Term") {
    throw new Errors.LangError(
      [
        `[goalFromValue] expect value in body to be a Term`,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  const target = lookup(mod, env, value.name)
  if (target === undefined) {
    throw new Errors.LangError(`[goalFromValue] undefined name: ${value.name}`)
  }

  return Goals.Apply(value.name, target, value.args)
}
