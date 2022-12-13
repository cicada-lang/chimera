import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export function useGlobals(): GlobalStore {
  if (globals) return globals

  globals = new GlobalStore()

  return globals
}
