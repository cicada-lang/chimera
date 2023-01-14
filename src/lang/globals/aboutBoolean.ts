import * as Errors from "../errors"
import * as Values from "../value"
import { formatValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutBoolean(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)

  globals.primitive("not", 1, ([value]) => {
    if (value["@kind"] !== "Boolean") {
      throw new Errors.LangError(
        [
          `[not] expect value to be Boolean`,
          `  value: ${formatValue(value)}`,
        ].join("\n"),
      )
    }

    return Values.Boolean(!value.data)
  })
}
