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
    const results: Array<Value> = []
    for (const value of Values.toArray(array)) {
      if (results.every((result) => !equal(value, result))) {
        results.push(value)
      }
    }

    return Values.fromArray(results)
  })
}
