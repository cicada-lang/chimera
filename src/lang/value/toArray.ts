import * as Errors from "../errors/index.js"
import type { Value } from "../value/index.js"
import * as Values from "../value/index.js"

export function toArray(value: Value): Array<Value> {
  const array: Array<Value> = []

  while (true) {
    if (value["@kind"] === "ListNull") {
      return array
    }

    if (value["@kind"] === "ListCons") {
      array.push(value.car)
      value = value.cdr
      continue
    }

    throw new Errors.LangError(
      [
        `[toArray] the given value is not an array`,
        `  value['@kind']: ${value["@kind"]}`,
      ].join("\n"),
    )
  }
}

export function fromArray(values: Array<Value>): Value {
  values = [...values]
  let result: Value = Values.ListNull()

  while (true) {
    const value = values.pop()
    if (value === undefined) {
      return result
    }

    result = Values.ListCons(value, result)
  }
}
