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

  // globals.primitive("Conj", 1, ([array]) => {
  //   return Values.Goal(
  //     Goals.Conj(
  //       Values.toArray(array).map((value) => {
  //         Values.assertValue(value, "Goal", { who: "conj" })
  //         return value.goal
  //       }),
  //     ),
  //   )
  // })

  // globals.primitive("Disj", 1, ([array]) => {
  //   return Values.Goal(
  //     Goals.Disj(
  //       Values.toArray(array).map((value) => {
  //         Values.assertValue(value, "Goal", { who: "conj" })
  //         return value.goal
  //       }),
  //     ),
  //   )
  // })

  globals.primitive("satisfy", 1, ([value]) => {
    Values.assertValue(value, "Goal", { who: "satisfy" })
    return Values.Boolean(satisfy(value.goal))
  })
}
