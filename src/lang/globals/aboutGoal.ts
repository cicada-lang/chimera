import * as Goals from "../goal"
import { satisfy } from "../satisfy"
import * as Values from "../value"
import type { GlobalStore } from "./GlobalStore"

export function aboutGoal(globals: GlobalStore): void {
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

  globals.primitive("conj", 1, ([value]) => {
    return Values.Goal(
      Goals.Conj(
        Values.toArray(value).map((value) => {
          Values.assertValue(value, "Goal", { who: "conj" })
          return value.goal
        }),
      ),
    )
  })

  globals.primitive("disj", 1, ([value]) => {
    return Values.Goal(
      Goals.Disj(
        Values.toArray(value).map((value) => {
          Values.assertValue(value, "Goal", { who: "disj" })
          return value.goal
        }),
      ),
    )
  })
}
