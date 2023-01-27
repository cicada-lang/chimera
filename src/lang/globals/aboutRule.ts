import { rewrite, rewriteManySteps } from "../rewrite"
import * as Values from "../value"

import type { GlobalStore } from "./GlobalStore"

export function aboutRule(globals: GlobalStore): void {
  globals.primitive("rewrite", 2, ([rule, target]) => {
    Values.assertValue(rule, "Rule", { who: "rewrite" })
    return rewrite(rule.rule, target)
  })

  globals.primitive("rewriteManySteps", 3, ([limit, rule, target]) => {
    Values.assertValue(limit, "Number", { who: "rewriteManySteps" })
    Values.assertValue(rule, "Rule", { who: "rewriteManySteps" })
    return Values.fromArray(
      rewriteManySteps(rule.rule, target, { limit: limit.data }),
    )
  })
}
