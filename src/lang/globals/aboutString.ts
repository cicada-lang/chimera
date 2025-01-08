import * as Values from "../value/index.ts"
import type { GlobalStore } from "./GlobalStore.ts"

export function aboutString(globals: GlobalStore): void {
  globals.define(
    "String",
    Values.TypeConstraint("String", (value) => value["@kind"] === "String"),
  )
}
