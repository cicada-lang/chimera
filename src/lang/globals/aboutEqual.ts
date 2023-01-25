import { equal } from "../equal"
import * as Goals from "../goal"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutEqual(globals: GlobalStore): Promise<void> {
  globals.primitive("Equal", 2, ([x, y]) => {
    return Values.Goal(Goals.Equal(x, y))
  })

  globals.primitive("NotEqual", 2, ([x, y]) => {
    return Values.Goal(Goals.NotEqual(x, y))
  })

  globals.primitive("equal", 2, ([x, y]) => {
    return Values.Boolean(equal(x, y))
  })
}
