import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutTerm(globals: GlobalStore): void {
  globals.primitive("isTerm", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Term")
  })
}
