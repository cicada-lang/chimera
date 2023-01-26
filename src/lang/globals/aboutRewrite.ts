import { rewriteManySteps } from "../rewrite"
import * as Values from "../value"

import type { GlobalStore } from "./GlobalStore"

export function aboutRewrite(globals: GlobalStore): void {
  globals.primitive("rewriteManySteps", 3, ([limit, rule, target]) => {
    Values.assertValue(limit, "Number", { who: "rewriteManySteps" })
    Values.assertValue(rule, "Rule", { who: "rewriteManySteps" })
    return Values.fromArray(
      rewriteManySteps(rule.rule, target, { limit: limit.data }),
    )
  })
}
