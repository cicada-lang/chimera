import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutTerm(globals: GlobalStore): void {
  globals.primitive("isTerm", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Term")
  })
}
