import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutArray(globals: GlobalStore): Promise<void> {
  globals.primitive("arrayLength", 1, ([value]) => {
    return Values.Number(Values.toArray(value).length)
  })

  globals.primitive("arrayAppend", 2, ([left, right]) => {
    return Values.fromArray([...Values.toArray(left), ...Values.toArray(right)])
  })
}
