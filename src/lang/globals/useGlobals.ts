import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()

  await globals.code(`

Equal [x, y] -- { x = y }

NotEqual [x, y] -- { x != y }

Null x -- { x = null }

Boolean x -- { x = false }
Boolean x -- { x = true }

`)

  return globals
}
