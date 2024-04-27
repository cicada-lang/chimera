import { aboutBoolean } from "./aboutBoolean.js"
import { aboutEqual } from "./aboutEqual.js"
import { aboutGoal } from "./aboutGoal.js"
import { aboutNull } from "./aboutNull.js"
import { aboutNumber } from "./aboutNumber.js"
import { aboutObject } from "./aboutObject.js"
import { aboutRelation } from "./aboutRelation.js"
import { aboutString } from "./aboutString.js"
import { aboutTerm } from "./aboutTerm.js"
import { GlobalStore } from "./GlobalStore.js"

let globals: GlobalStore | undefined = undefined

export function useGlobals(): GlobalStore {
  if (globals) return globals

  globals = new GlobalStore()

  aboutEqual(globals)

  aboutGoal(globals)
  aboutRelation(globals)

  aboutNull(globals)
  aboutBoolean(globals)
  aboutNumber(globals)
  aboutString(globals)
  aboutObject(globals)
  aboutTerm(globals)

  return globals
}
