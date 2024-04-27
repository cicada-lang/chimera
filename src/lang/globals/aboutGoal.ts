import * as Goals from "../goal/index.js"
import { createSolutionFromGoals, solutionUpdate } from "../solution/index.js"
import { solve } from "../solve/index.js"
import * as Values from "../value/index.js"
import type { GlobalStore } from "./GlobalStore.js"

export function aboutGoal(globals: GlobalStore): void {
  globals.primitive("Equal", 2, ([x, y]) => {
    return Values.Goal(Goals.Equal(x, y))
  })

  globals.primitive("NotEqual", 2, ([x, y]) => {
    return Values.Goal(Goals.NotEqual(x, y))
  })
}
