import { aboutArray } from "./aboutArray"
import { aboutBoolean } from "./aboutBoolean"
import { aboutControlFlow } from "./aboutControlFlow"
import { aboutEqual } from "./aboutEqual"
import { aboutNull } from "./aboutNull"
import { aboutNumber } from "./aboutNumber"
import { aboutString } from "./aboutString"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()

  await aboutNull(globals)
  await aboutBoolean(globals)
  await aboutEqual(globals)
  await aboutControlFlow(globals)
  await aboutNumber(globals)
  await aboutString(globals)
  await aboutArray(globals)

  return globals
}
