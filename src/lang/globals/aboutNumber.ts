import * as Values from "../value/index.ts"
import type { GlobalStore } from "./GlobalStore.ts"

export function aboutNumber(globals: GlobalStore): void {
  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )
}
