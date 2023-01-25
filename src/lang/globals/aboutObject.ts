import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutObject(globals: GlobalStore): Promise<void> {
  globals.primitive("isObject", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Objekt")
  })
}
