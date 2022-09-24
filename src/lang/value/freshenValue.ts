import { Json } from "../../utils/Json"
import * as Values from "../value"
import { Value } from "../value"

/**
   Side-effects on `usedNames`.
**/

export function freshenValue(
  usedNames: Set<string> | Array<string>,
  json: Json,
): Value {
  if (typeof json === "string") {
    return Values.String(json)
  }

  if (typeof json === "number") {
    return Values.Number(json)
  }

  if (typeof json === "boolean") {
    return Values.Boolean(json)
  }

  if (json === null) {
    return Values.Null()
  }

  if (json instanceof Array) {
    return Values.Arrai(json.map((item) => freshenValue(usedNames, item)))
  }

  throw new Error("TODO")
}
