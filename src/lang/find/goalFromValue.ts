import { Env, envLookupValue } from "../env"
import * as Errors from "../errors"
import * as Goals from "../goal"
import type { Mod } from "../mod"
import type { Value } from "../value"
import { formatValue } from "../value"

export function goalFromValue(mod: Mod, env: Env, value: Value) {
  if (value["@kind"] !== "Term") {
    throw new Errors.LangError(
      [
        `[goalFromValue] expect value in body to be a Term`,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  {
    const target = envLookupValue(env, value.name)
    if (target !== undefined) {
      return Goals.Apply(value.name, target, value.args)
    }
  }

  {
    const target = envLookupValue(mod.env, value.name)
    if (target !== undefined) {
      return Goals.Apply(value.name, target, value.args)
    }
  }

  throw new Errors.LangError(`[goalFromValue] undefined name: ${value.name}`)
}
