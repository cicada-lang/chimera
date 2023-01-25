import * as Values from "../value"
import { assertValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutBoolean(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Boolean(x) -- { Equal(x, false) }
clause Boolean(x) -- { Equal(x, true) }

`)

  globals.primitive("isBoolean", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Boolean")
  })

  globals.primitive("not", 1, ([value]) => {
    assertValue(value, "Boolean", { who: "not" })
    return Values.Boolean(!value.data)
  })
}
