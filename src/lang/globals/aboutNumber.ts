import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutNumber(globals: GlobalStore): Promise<void> {
  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )
}
