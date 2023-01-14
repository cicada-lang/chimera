import { aboutNumber } from "./aboutNumber"
import { aboutString } from "./aboutString"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()

  await globals.code(`

clause Equal(x, y) -- { x = y }

clause NotEqual(x, y) -- { x != y }

clause Null(x) -- { x = null }

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)

  await globals.code(`

function if(target, thenFn, elseFn) {
  if target {
    return thenFn()
  } else {
    return elseFn()
  }
}

`)

  await aboutNumber(globals)
  await aboutString(globals)
  return globals
}
