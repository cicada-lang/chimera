import { aboutBoolean } from "./aboutBoolean.js"
import { aboutEqual } from "./aboutEqual.js"
import { aboutGoal } from "./aboutGoal.js"
import { aboutNull } from "./aboutNull.js"
import { aboutNumber } from "./aboutNumber.js"
import { aboutString } from "./aboutString.js"
import { GlobalStore } from "./GlobalStore.js"

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
