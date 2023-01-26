import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutNull(globals: GlobalStore): void {
  globals.code(`

clause Null(x) -- { Equal(x, null) }

`)

  globals.primitive("isNull", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Null")
  })
}
