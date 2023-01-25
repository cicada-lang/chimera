import { equal } from "../equal"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutEqual(globals: GlobalStore): Promise<void> {
  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
