import { product } from "../../utils/product"
import * as Actions from "../actions"
import { equal } from "../equal"
import * as Errors from "../errors"
import { formatValue } from "../format"
import type { Value } from "../value"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutArray(globals: GlobalStore): Promise<void> {
  globals.primitive("arrayGet", 2, ([array, index]) => {
    Values.assertValue(index, "Number", { who: "arrayGet" })
    const result = Values.toArray(array)[index.data]
    if (result === undefined) {
      throw new Errors.LangError(
        [
          `[arrayGet] index out of bound`,
          `  array: ${formatValue(array)}`,
          `  index: ${index.data}`,
        ].join("\n"),
      )
    }

    return result
  })

  globals.primitive("arrayLength", 1, ([array]) => {
    return Values.Number(Values.toArray(array).length)
  })

  globals.primitive("arrayAppend", 2, ([left, right]) => {
    return Values.fromArray([...Values.toArray(left), ...Values.toArray(right)])
  })

  globals.primitive("arrayDedup", 1, ([array]) => {
    return Values.fromArray(arrayDedup(Values.toArray(array)))
  })

  globals.primitive("arrayUnion", 2, ([left, right]) => {
    return Values.fromArray(
      arrayDedup([...Values.toArray(left), ...Values.toArray(right)]),
    )
  })

  globals.primitive("arrayIntersection", 2, ([left, right]) => {
    const leftValues = Values.toArray(left)
    const rightValues = Values.toArray(right)
    const results: Array<Value> = []

    for (const leftValue of leftValues) {
      if (arrayMember(rightValues, leftValue)) {
        results.push(leftValue)
      }
    }

    return Values.fromArray(arrayDedup(results))
  })

  globals.primitive("arrayMember", 2, ([values, target]) => {
    return Values.Boolean(arrayMember(Values.toArray(values), target))
  })

  globals.primitive("arrayFilter", 2, ([values, predicate]) => {
    return Values.fromArray(
      Values.toArray(values).filter((value) => {
        const result = Actions.doAp(predicate, [value])
        Values.assertValue(result, "Boolean", { who: "arrayFilter" })
        return result.data
      }),
    )
  })

  globals.primitive("arrayProduct", 1, ([arrays]) => {
    return Values.fromArray(
      product(Values.toArray(arrays).map(Values.toArray)).map(Values.fromArray),
    )
  })
}

function arrayDedup(values: Array<Value>): Array<Value> {
  const results: Array<Value> = []
  for (const value of values) {
    if (!arrayMember(results, value)) {
      results.push(value)
    }
  }

  return results
}

function arrayMember(values: Array<Value>, target: Value): boolean {
  for (const value of values) {
    if (equal(value, target)) {
      return true
    }
  }

  return false
}
