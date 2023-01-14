import type { GlobalStore } from "./GlobalStore"

export async function aboutNull(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Null(x) -- { x = null }

`)
}
