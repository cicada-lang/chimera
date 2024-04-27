import type { GlobalStore } from "./GlobalStore.js"

export function aboutNull(globals: GlobalStore): void {
  globals.code(`

clause Null(x) -- { Equal(x, null) }

`)
}
