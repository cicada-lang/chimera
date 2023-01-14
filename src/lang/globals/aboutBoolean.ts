import * as Values from "../value"
import { assertValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutBoolean(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)

  globals.primitive("not", 1, ([value]) => {
    assertValue(value, "Boolean", { who: "not" })
    return Values.Boolean(!value.data)
  })
}
