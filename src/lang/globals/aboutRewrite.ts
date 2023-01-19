import { rewriteManySteps } from "../rewrite"
import * as Values from "../value"

import type { GlobalStore } from "./GlobalStore"

export async function aboutRewrite(globals: GlobalStore): Promise<void> {
  globals.primitive(
    "rewriteManySteps",
    3,
    ([limit, rule, target], { mod, env }) => {
      Values.assertValue(limit, "Number", { who: "rewriteManySteps" })
      Values.assertValue(rule, "Rule", { who: "rewriteManySteps" })
      return Values.fromArray(
        rewriteManySteps(rule.rule, target, { limit: limit.data }),
      )
    },
  )
}
