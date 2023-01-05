import * as Errors from "../errors"
import type { Value } from "../value"
import * as Values from "../value"

export function toArray(value: Value): Array<Value> {
  if (value["@kind"] === "ArrayNull") {
    return []
  }

  if (value["@kind"] === "ArrayCons") {
    return [value.car, ...toArray(value.cdr)]
  }

  throw new Errors.LangError(
    [
      `[toArray] the given value is not an array`,
      `  value['@kind']: ${value["@kind"]}`,
    ].join("\n"),
  )
}

export function fromArray(values: Array<Value>): Value {
  if (values.length === 0) {
    return Values.ArrayNull()
  }

  const [value, ...restValues] = values

  return Values.ArrayCons(value, fromArray(restValues))
}
