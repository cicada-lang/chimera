import { aboutControlFlow } from "./aboutControlFlow"
import { aboutNumber } from "./aboutNumber"
import { aboutRelation } from "./aboutRelation"
import { aboutString } from "./aboutString"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()
  await aboutRelation(globals)
  await aboutControlFlow(globals)
  await aboutNumber(globals)
  await aboutString(globals)
  return globals
}
