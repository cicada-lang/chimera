import * as Values from "../value/index.js"
import { assertValue } from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutBoolean(globals: GlobalStore): void {
  globals.code(`

relation Boolean(x) -- { Equal(x, false) }
relation Boolean(x) -- { Equal(x, true) }

`)
}
