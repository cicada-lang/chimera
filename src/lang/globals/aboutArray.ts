import { equal } from "../equal"
import type { Value } from "../value"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutArray(globals: GlobalStore): Promise<void> {
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
}

function arrayDedup(values: Array<Value>): Array<Value> {
  const results: Array<Value> = []
  for (const value of values) {
    if (results.every((result) => !equal(value, result))) {
      results.push(value)
    }
  }

  return results
}
