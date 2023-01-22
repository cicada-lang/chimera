import { equal } from "../equal"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutEqual(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Equal(x, y) -- { x = y }
clause NotEqual(x, y) -- { x != y }

`)

  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
