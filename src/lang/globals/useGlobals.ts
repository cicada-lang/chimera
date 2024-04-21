import { aboutArray } from "./aboutArray"
import { aboutBoolean } from "./aboutBoolean"
import { aboutEqual } from "./aboutEqual"
import { aboutGoal } from "./aboutGoal"
import { aboutNull } from "./aboutNull"
import { aboutNumber } from "./aboutNumber"
import { aboutObject } from "./aboutObject"
import { aboutRelation } from "./aboutRelation"
import { aboutRule } from "./aboutRule"
import { aboutString } from "./aboutString"
import { aboutTerm } from "./aboutTerm"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export function useGlobals(): GlobalStore {
  if (globals) return globals

  globals = new GlobalStore()

  aboutEqual(globals)

  aboutGoal(globals)
  aboutRelation(globals)
  aboutRule(globals)

  aboutNull(globals)
  aboutBoolean(globals)
  aboutNumber(globals)
  aboutString(globals)
  aboutArray(globals)
  aboutObject(globals)
  aboutTerm(globals)

  return globals
}
