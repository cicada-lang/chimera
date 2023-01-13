import * as Errors from "../errors"
import * as Values from "../value"
import { formatValue } from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutString(globals: GlobalStore): Promise<void> {
  globals.define(
    "String",
    Values.TypeConstraint("String", (value) => value["@kind"] === "String"),
  )

  globals.define(
    "stringLength",
    Values.Primitive(
      "stringLength",
      1,
      ([value]) => {
        if (value["@kind"] !== "String") {
          throw new Errors.LangError(
            [
              `[stringLength] expect value to be String`,
              `  value: ${formatValue(value)}`,
            ].join("\n"),
          )
        }

        return Values.Number(value.data.length)
      },
      [],
    ),
  )
}
