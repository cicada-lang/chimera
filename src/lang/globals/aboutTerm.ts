import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutTerm(globals: GlobalStore): Promise<void> {
  globals.primitive("isTerm", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "Term")
  })
}
