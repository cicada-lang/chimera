import type { GlobalStore } from "./GlobalStore"

export async function aboutRelation(globals: GlobalStore): Promise<void> {
  await globals.code(`

clause Equal(x, y) -- { x = y }

clause NotEqual(x, y) -- { x != y }

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)
}
