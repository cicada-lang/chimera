import { equal } from "../equal/index.ts"
import * as Values from "../value/index.ts"
import type { GlobalStore } from "./GlobalStore.ts"

export function aboutEqual(globals: GlobalStore): void {
  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
