import * as Errors from "../errors"
import * as Values from "../value"
import { formatValue } from "../value"
import { GlobalStore } from "./GlobalStore"

let globals: GlobalStore | undefined = undefined

export async function useGlobals(): Promise<GlobalStore> {
  if (globals) return globals

  globals = new GlobalStore()

  await globals.code(`

clause Equal(x, y) -- { x = y }

clause NotEqual(x, y) -- { x != y }

clause Null(x) -- { x = null }

clause Boolean(x) -- { x = false }
clause Boolean(x) -- { x = true }

`)

  await globals.code(`

function if(target, thenFn, elseFn) {
  if target {
    return thenFn()
  } else {
    return elseFn()
  }
}

`)

  globals.define(
    "Number",
    Values.TypeConstraint("Number", (value) => value["@kind"] === "Number"),
  )

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

  return globals
}
