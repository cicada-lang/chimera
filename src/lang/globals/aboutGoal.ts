import * as Goals from "../goal"
import { satisfy } from "../satisfy"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutGoal(globals: GlobalStore): Promise<void> {
  globals.primitive("Equal", 2, ([x, y]) => {
    return Values.Goal(Goals.Equal(x, y))
  })

  globals.primitive("NotEqual", 2, ([x, y]) => {
    return Values.Goal(Goals.NotEqual(x, y))
  })

  globals.primitive("satisfy", 1, ([value]) => {
    Values.assertValue(value, "Goal", { who: "satisfy" })
    return Values.Boolean(satisfy(value.goal))
  })
}
