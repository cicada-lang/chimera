import { equal } from "../equal/index.js"
import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutEqual(globals: GlobalStore): void {
  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
