import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutNumber(globals: GlobalStore): void {
  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )
}
