import { equal } from "../equal"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutEqual(globals: GlobalStore): void {
  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
