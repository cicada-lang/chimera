import { aboutBoolean } from "./aboutBoolean.ts"
import { aboutEqual } from "./aboutEqual.ts"
import { aboutGoal } from "./aboutGoal.ts"
import { aboutNull } from "./aboutNull.ts"
import { aboutNumber } from "./aboutNumber.ts"
import { aboutString } from "./aboutString.ts"
import { GlobalStore } from "./GlobalStore.ts"

let globals: GlobalStore | undefined = undefined

export function useGlobals(): GlobalStore {
  if (globals) return globals

  globals = new GlobalStore()

  aboutEqual(globals)
  aboutGoal(globals)
  aboutNull(globals)
  aboutBoolean(globals)
  aboutNumber(globals)
  aboutString(globals)

  return globals
}
