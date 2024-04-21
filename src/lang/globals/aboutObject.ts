import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutObject(globals: GlobalStore): void {
  globals.primitive("isObject", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Objekt")
  })
}
