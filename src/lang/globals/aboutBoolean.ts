import * as Values from "../value/index.js"
import { assertValue } from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutBoolean(globals: GlobalStore): void {
  globals.code(`

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
