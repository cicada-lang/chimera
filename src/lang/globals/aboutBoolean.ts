import type { GlobalStore } from "./GlobalStore"

export async function aboutBoolean(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)
}
