import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutObject(globals: GlobalStore): void {
  globals.primitive("isObject", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Objekt")
  })
}
