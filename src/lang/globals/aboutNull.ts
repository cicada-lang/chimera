import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutNull(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Null(x) -- { x = null }

`)

  globals.primitive("isNull", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Null")
  })
}
