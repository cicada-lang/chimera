import type { GlobalStore } from "./GlobalStore.ts"

export function aboutBoolean(globals: GlobalStore): void {
  globals.code(`

relation Boolean(x) -- { Equal(x, false) }
relation Boolean(x) -- { Equal(x, true) }

`)
}
