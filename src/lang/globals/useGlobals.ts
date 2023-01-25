import { aboutArray } from "./aboutArray"
import { aboutBoolean } from "./aboutBoolean"
import { aboutEqual } from "./aboutEqual"
import { aboutGoal } from "./aboutGoal"
import { aboutHyperrewrite } from "./aboutHyperrewrite"
import { aboutNull } from "./aboutNull"
import { aboutNumber } from "./aboutNumber"
import { aboutObject } from "./aboutObject"
import { aboutRelation } from "./aboutRelation"
import { aboutRewrite } from "./aboutRewrite"
import { aboutString } from "./aboutString"
import { aboutTerm } from "./aboutTerm"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()

  await aboutEqual(globals)

  await aboutGoal(globals)
  await aboutRelation(globals)
  await aboutRewrite(globals)
  await aboutHyperrewrite(globals)

  await aboutNull(globals)
  await aboutBoolean(globals)
  await aboutNumber(globals)
  await aboutString(globals)
  await aboutArray(globals)
  await aboutObject(globals)
  await aboutTerm(globals)

  return globals
}
