import * as Values from "../value"
import { assertValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutString(globals: GlobalStore): void {
  globals.define(
    "String",
    Values.TypeConstraint("String", (value) => value["@kind"] === "String"),
  )

  globals.primitive("isString", 1, ([value]) => {
    return Values.Boolean(value["@kind"] === "String")
  })

  globals.primitive("stringLength", 1, ([value]) => {
    assertValue(value, "String", { who: "stringLength" })
    return Values.Number(value.data.length)
  })

  globals.primitive("stringAppend", 2, ([left, right]) => {
    assertValue(left, "String", { who: "stringAppend" })
    assertValue(right, "String", { who: "stringAppend" })
    return Values.String(left.data.concat(right.data))
  })
}
