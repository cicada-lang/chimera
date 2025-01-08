import * as Goals from "../goal/index.ts"
import * as Values from "../value/index.ts"
import type { GlobalStore } from "./GlobalStore.ts"

export function aboutGoal(globals: GlobalStore): void {
  globals.primitive("Equal", 2, ([x, y]) => {
    return Values.Goal(Goals.Equal(x, y))
  })

  globals.primitive("NotEqual", 2, ([x, y]) => {
    return Values.Goal(Goals.NotEqual(x, y))
  })
}
