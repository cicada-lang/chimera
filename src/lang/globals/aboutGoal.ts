import { satisfy } from "../satisfy"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export async function aboutGoal(globals: GlobalStore): Promise<void> {
  globals.primitive("satisfy", 1, ([value]) => {
    Values.assertValue(value, "Goal", { who: "satisfy" })
    return Values.Boolean(satisfy(value.goal))
  })

  globals.primitive("sat", 1, ([value]) => {
    Values.assertValue(value, "Goal", { who: "sat" })
    return Values.Boolean(satisfy(value.goal))
  })
}
