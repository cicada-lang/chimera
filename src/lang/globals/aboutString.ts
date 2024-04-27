import * as Values from "../value/index.js"
import { assertValue } from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutString(globals: GlobalStore): void {
  globals.define(
    "String",
    Values.TypeConstraint("String", (value) => value["@kind"] === "String"),
  )
}
