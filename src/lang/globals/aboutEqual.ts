import type { GlobalStore } from "./GlobalStore"

export async function aboutEqual(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Equal(x, y) -- { x = y }
clause NotEqual(x, y) -- { x != y }

`)
}
